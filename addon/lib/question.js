import EmberObject, { computed } from "@ember/object";
import { computedTask, lastValue } from "ember-caluma-form/utils/concurrency";
import { task } from "ember-concurrency";
import jexl from "jexl";
import Parser from "jexl/lib/parser/Parser";

/**
 * Generator to walk down a JEXL AST tree and yield all transforms
 *
 * @generator
 * @function getTransforms
 * @param {Object} tree The JEXL AST tree or branch
 * @yields {Object} The found transform
 */
export const getTransforms = function*(tree) {
  for (let node of Object.values(tree)) {
    if (typeof node === "object") {
      yield* getTransforms(node);
    }
  }

  if (tree.type && tree.type === "Transform") {
    yield { name: tree.name, subject: tree.subject, args: tree.args };
  }
};

/**
 * Object which represents a question in context of a field
 *
 * @class Question
 */
export default EmberObject.extend({
  _isHiddenDependencies: computed("isHidden", function() {
    let grammar = jexl._getGrammar();
    let parser = new Parser(grammar);

    parser.addTokens(jexl._getLexer().tokenize(this.isHidden));

    const ast = parser.complete();

    let iterator = getTransforms(ast);
    let result = iterator.next();
    let transforms = [];

    while (!result.done) {
      transforms.push(result.value);

      result = iterator.next();
    }

    return transforms.map(transform => transform.subject.value);
  }),

  hidden: lastValue("_hidden"),
  _hidden: computedTask(
    "field.watchedFields.@each.{_hidden,_value}",
    "isHidden",
    "_hiddenTask"
  ),
  _hiddenTask: task(function*() {
    if (this.field.watchedFields.some(field => field._hidden)) {
      return true;
    }

    return yield this.field.document.questionJexl.eval(this.isHidden);
  }),

  /**
   * Promise which parses the questions `isRequired` and tells whether the
   * question is optional or not.
   *
   * @property {RSVP.Promise} optional
   * @accessor
   */
  optional: lastValue("_optional"),
  _optional: computedTask("isRequired", "_optionalTask"),
  _optionalTask: task(function*() {
    return !(yield this.field.document.questionJexl.eval(this.isRequired));
  })
});
