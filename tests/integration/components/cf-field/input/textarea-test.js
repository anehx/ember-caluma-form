import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | cf-field/input/textarea", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    assert.expect(4);

    await render(hbs`
      {{cf-field/input/textarea
        field=(hash
          id="test"
          answer=(hash
            stringValue="Test Test Test"
          )
          question=(hash
            textareaMaxLength=200
          )
        )
      }}
    `);

    assert.dom("textarea").hasClass("uk-textarea");
    assert.dom("textarea").hasAttribute("name", "test");
    assert.dom("textarea").hasAttribute("maxlength", "200");
    assert.dom("textarea").hasValue("Test Test Test");
  });
});
