import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';

module('Integration | Component | rental/image', function (hooks) {
  setupRenderingTest(hooks);

  // test('it renders', async function (assert) {
  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.set('myAction', function(val) { ... });

  //   await render(hbs`<Rental::Image />`);

  //   assert.dom().hasText('');

  //   // Template block usage:
  //   await render(hbs`
  //     <Rental::Image>
  //       template block text
  //     </Rental::Image>
  //   `);

  //   assert.dom().hasText('template block text');

  test('it renders the given image', async function (assert) {
    await render(hbs`
      <Rental::Image 
        src="../teaching-tomster.png"
        alt="Teaching Tomster"
      />
    `);

    assert
      .dom('.image img')
      .exists()
      .hasAttribute('src', '../teaching-tomster.png')
      .hasAttribute('alt', 'Teaching Tomster');
  });

  test('clicking on the component toggles its size', async function (assert) {
    await render(hbs`
      <Rental::Image
        src="../teaching-tomster.png"
        alt="Teaching Tomster"
      />  
    `);

    assert.dom('button.image').exists();

    assert.dom('.image').doesNotHaveClass('large');
    assert.dom('.image small').hasText('View Larger');

    await click('button.image');

    assert.dom('.image').hasClass('large');
    assert.dom('.image small').hasText('View Smaller');

    await click('button.image');

    assert.dom('.image').doesNotHaveClass('large');
    assert.dom('.image small').hasText('View Larger');
  });
});
