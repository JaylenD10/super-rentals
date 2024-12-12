import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';

module('Integration | Component | rental/detailed', function (hooks) {
  setupRenderingTest(hooks);

  //test('it renders', async function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.set('myAction', function(val) { ... });
  hooks.beforeEach(function () {
    this.setProperties({
      rental: {
        id: 'grand-old-mansion',
        title: 'Grand Old Mansion',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        location: {
          lat: 37.7749,
          lng: -122.4194,
        },
        category: 'Estate',
        type: 'Standalone',
        bedrooms: 15,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpb',
        description:
          'This grand old mansion sists on over 100 acres of rolling hills and dense redwood forests.',
      },
    });
  });

  //await render(hbs`<Rental::Detailed />`);
  test('it renders a header with a share button', async function (assert) {
    await render(hbs`<Rental::Detailed @rental={{this.rental}} />`);
    //assert.dom().hasText('');

    assert.dom('.jumbo').exists();
    assert.dom('.jumbo h2').containsText('Grand Old Mansion');
    assert
      .dom('.jumbo p')
      .containsText('a nice place to stay near San Francisco');
    assert.dom('.jumbo a.button').containsText('Share on Twitter');
  });

  // Template block usage:
  // await render(hbs`
  //   <Rental::Detailed>
  //     template block text
  //   </Rental::Detailed>
  // `);

  test('it renders detailed information about a rental property', async function (assert) {
    await render(hbs`<Rental::Detailed @rental={{this.rental}} />`);
    //assert.dom().hasText('template block text');

    assert.dom('article').hasClass('rental');
    assert.dom('article h3').containsText('About Grand Old Mansion');
    assert.dom('article .detail.owner').containsText('Veruca Salt');
    assert.dom('article .detail.type').containsText('Standalone - Estate');
    assert.dom('article .detail.location').containsText('San Francisco');
    assert.dom('article .detail.bedrooms').containsText('15');
    assert.dom('article .image').exists();
    assert.dom('article .map').exists();
  });
});
