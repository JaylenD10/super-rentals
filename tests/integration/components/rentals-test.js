import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';

module('Integration | Component | rentals', function (hooks) {
  setupRenderingTest(hooks);

  // test('it renders', async function (assert) {
  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.set('myAction', function(val) { ... });

  //   await render(hbs`<Rental />`);

  //   assert.dom().hasText('');

  //   // Template block usage:
  //   await render(hbs`
  //     <Rental>
  //       template block text
  //     </Rental>
  //   `);

  //   assert.dom().hasText('template block text');

  // test('it renders information about a rental property', async function (assert) {
  //   await render(hbs`<Rental />`);
  //   this.setProperties({
  //     rental: {
  //       id: 'grand-old-mansion',
  //       title: 'Grand Old Mansion',
  //       owner: 'Veruca Salt',
  //       city: 'San Francisco',
  //       location: {
  //         lat: 37.7749,
  //         lng: -122.4194,
  //       },
  //       category: 'Estate',
  //       type: 'Standalone',
  //       bedrooms: 15,
  //       image:
  //         'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
  //       description:
  //         'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
  //     },
  //   });

  //   await render(hbs`<Rental @rental={{this.rental}} />`);

  //   assert.dom('article').hasClass('rental');
  //   assert.dom('article h3').hasText('Grand Old Mansion');
  //   assert
  //     .dom('article h3 a')
  //     .hasAttribute('href', '/rentals/grand-old-mansion');
  //   assert.dom('article .detail.owner').includesText('Veruca Salt');
  //   assert.dom('article .detail.type').includesText('Standalone');
  //   assert.dom('article .detail.location').includesText('San Francisco');
  //   assert.dom('article .detail.bedrooms').includesText('15');
  //   assert.dom('article .image').exists();
  //   assert.dom('article .map').exists();
  // });

  hooks.beforeEach(function () {
    this.setProperties({
      rentals: [
        {
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
            'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description:
            'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
        },
        {
          id: 'urban-living',
          title: 'Urban Living',
          owner: 'Seatle',
          city: 'Seatle',
          location: {
            lat: 47.6062,
            lng: -122.3321,
          },
          category: 'Condo',
          type: 'Community',
          bedrooms: 1,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/2/20/Seattle_-_Barnes_and_Bell_Building.jpg',
          description:
            'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.',
        },
        {
          id: 'downtown-charm',
          title: 'Downtown Charm',
          owner: 'Violet Beauregarde',
          city: 'Portland',
          location: {
            lat: 45.5175,
            lng: -122.6801,
          },
          category: 'Apartment',
          type: 'Community',
          bedrooms: 3,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
          description:
            'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.',
        },
      ],
    });
  });

  test('it renders all give rental properties by default', async function (assert) {
    await render(hbs`<Rentals @rentals={{this.rentals}} />`);

    assert.dom('.rentals').exists();
    assert.dom('.rentals input').exists();

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 3 });

    assert
      .dom('.rentals .results li:nth-of-type(1)')
      .containsText('Grand Old Mansion');

    assert
      .dom('.rentals .results li:nth-of-type(2)')
      .containsText('Urban Living');

    assert
      .dom('.rentals .results li:nth-of-type(3)')
      .containsText('Downtown Charm');
  });

  test('it updates the results according to the search query', async function (assert) {
    await render(hbs`<Rentals @rentals={{this.rentals}} />`);

    assert.dom('.rentals').exists();
    assert.dom('.rentals input').exists();

    await fillIn('.rentals input', 'Downtown');

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({count: 1});
    assert.dom('.rentals .results li').containsText('Downtown Charm');

    await fillIn('.rentals input', 'Mansion');

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({count: 1});
    assert.dom('.rentals .results li').containsText('Grand Old Mansion');
  });
});
