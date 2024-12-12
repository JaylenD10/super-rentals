import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
//import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';
import { hbs } from 'ember-cli-htmlbars';

// module('Integration | Component | share-button', function (hooks) {
//   setupRenderingTest(hooks);

//   test('it renders', async function (assert) {
//     // Set any properties with this.set('myProperty', 'value');
//     // Handle any actions with this.set('myAction', function(val) { ... });

//     await render(hbs`<ShareButton />`);

//     assert.dom().hasText('');

//     // Template block usage:
//     await render(hbs`
//       <ShareButton>
//         template block text
//       </ShareButton>
//     `);

//     assert.dom().hasText('template block text');
//   });
// });

const MOCK_URL = new URL(
  '/foo/bar?baz=true#some-section',
  window.location.origin,
);

class MockRouterService extends Service {
  get currentURL() {
    return '/foo/bar?baz=true#some-section';
  }
}

module('Integration | Component | share-button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:router', MockRouterService);

    this.tweetParam = (param) => {
      let link = find('a');
      let url = new URL(link.href);
      return url.searchParams.get(param);
    };
  });

  test('basic usage', async function (assert) {
    await render(hbs`<ShareButton>Tweet this!</ShareButton>`);

    assert
      .dom('a')
      .hasAttribute('target', '_blank')
      .hasAttribute('rel', 'external nofollow noopener noreferrer')
      .hasAttribute(
        // 'href',
        // `https://twitter.com/intent/tweet?url=${encodeURIComponent(MOCK_URL.href)}`
        'href',
        /^https:\/\/twitter\.com\/intent\/tweet/,
      )
      .hasClass('share')
      .hasClass('button')
      .containsText('Tweet this!');

    assert.strictEqual(this.tweetParam('url'), MOCK_URL.href);
  });

  test('it supports passing @text', async function (assert) {
    await render(
      hbs`<ShareButton @text="Hello Twitter!">Tweet this!</ShareButton>`,
    );

    assert.strictEqual(this.tweetParam('text'), 'Hello Twitter!');
  });

  test('it supports passing @hashtags', async function (assert) {
    await render(
      hbs`<ShareButton @hashtags="foo,bar,baz">Tweet this!</ShareButton>`,
    );

    assert.strictEqual(this.tweetParam('hashtags'), 'foo,bar,baz');
  });

  test('it supports passing @via', async function (assert) {
    await render(hbs`<ShareButton @via="emberjs">Tweet this!</ShareButton>`);
    assert.strictEqual(this.tweetParam('via'), 'emberjs');
  });

  test('it supports adding extra classes', async function (assert) {
    await render(
      hbs`<ShareButton class="extra things">Tweet this!</ShareButton>`,
    );

    assert
      .dom('a')
      .hasClass('share')
      .hasClass('button')
      .hasClass('extra')
      .hasClass('things');
  });

  test('the target, rel and href attributes cannot be overriden', async function (assert) {
    await render(
      hbs`<ShareButton target="_self" rel="" href="/">Not a Tweet!</ShareButton>`,
    );

    assert
      .dom('a')
      .hasAttribute('target', '_blank')
      .hasAttribute('rel', 'external nofollow noopener noreferrer')
      .hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/);
  });
});
