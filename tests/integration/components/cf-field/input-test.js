import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | cf-field/input", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders a text field", async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{cf-field/input
        field=(hash
          question=(hash
            __typename="TextQuestion"
          )
          answer=(hash
            stringValue="Test"
          )
        )
      }}
    `);

    assert.dom(".uk-form-controls").exists();
    assert.dom("input[type=text]").hasValue("Test");
  });

  test("it renders a textarea field", async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{cf-field/input
        field=(hash
          question=(hash
            __typename="TextareaQuestion"
          )
          answer=(hash
            stringValue="Test"
          )
        )
      }}
    `);

    assert.dom(".uk-form-controls").exists();
    assert.dom("textarea").hasValue("Test");
  });

  test("it renders an integer field", async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{cf-field/input
        field=(hash
          question=(hash
            __typename="IntegerQuestion"
          )
          answer=(hash
            integerValue=5
          )
        )
      }}
    `);

    assert.dom(".uk-form-controls").exists();
    assert.dom("input[type=number]").hasValue("5");
  });

  test("it renders a float field", async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{cf-field/input
        field=(hash
          question=(hash
            __typename="FloatQuestion"
          )
          answer=(hash
            floatValue=0.55
          )
        )
      }}
    `);

    assert.dom(".uk-form-controls").exists();
    assert.dom("input[type=number]").hasValue("0.55");
  });

  test("it renders a radio field", async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{cf-field/input
        field=(hash
          question=(hash
            radioOptions=(hash
              edges=(array
                (hash node=(hash slug="option-1"))
              )
            )
            __typename="RadioQuestion"
          )
          answer=(hash
            stringValue="option-1"
          )
        )
      }}
    `);

    assert.dom(".uk-form-controls").exists();
    assert.dom("input[type=radio][value='option-1']").isChecked();
  });
});
