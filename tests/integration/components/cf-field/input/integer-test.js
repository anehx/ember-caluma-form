import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | cf-field/input/integer", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    assert.expect(7);

    await render(hbs`
      {{cf-field/input/integer
        field=(hash
          id="test"
          answer=(hash
            integerValue=3
          )
          question=(hash
            integerMinValue=1
            integerMaxValue=5
          )
        )
      }}
    `);

    assert.dom("input").hasClass("uk-input");
    assert.dom("input").hasAttribute("name", "test");
    assert.dom("input").hasAttribute("type", "number");
    assert.dom("input").hasAttribute("step", "1");
    assert.dom("input").hasAttribute("min", "1");
    assert.dom("input").hasAttribute("max", "5");
    assert.dom("input").hasValue("3");
  });

  test("it can be disabled", async function(assert) {
    assert.expect(1);

    await render(hbs`{{cf-field/input/integer disabled=true}}`);

    assert.dom("input").isDisabled();
  });
});
