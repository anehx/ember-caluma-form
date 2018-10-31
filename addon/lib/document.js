import EmberObject, { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import jexl from "jexl";

/**
 * Object which represents a document in context of a field
 *
 * @class Document
 */
export default EmberObject.extend({
  fieldStore: service(),

  init() {
    this._super(...arguments);

    const questionJexl = new jexl.Jexl();

    questionJexl.addTransform("answer", slug => {
      const field = this.fields.find(field => field.question.slug === slug);

      return field.answer.value;
    });

    this.setProperties({ questionJexl });
  },

  fields: computed("fieldStore.fields.[]", "id", function() {
    return this.fieldStore.fields.filter(
      field => field.document.id === this.id
    );
  })
});
