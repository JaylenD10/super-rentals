import Route from '@ember/routing/route';
import { service } from '@ember/service';

//const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

export default class IndexRoute extends Route {
  @service store;
  async model() {
    return this.store.findAll('rental');
  }
}
//   async model() {
// return {
//     title: 'Grand Old Mansion',
//     owner: 'Veruca Salt',
//     city: 'San Francisco',
//     location: {
//         lat: 37.7749,
//         lng: -122.4194,
//     },
//     category: 'Estate',
//     type: 'Standalone',
//     bedrooms: 15,
//     image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
//     description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
// };
//     let response = await fetch('/api/rentals.json');
// let parsed = await response.json();
// return parsed;
//     let { data } = await response.json();

//     return data.map((model) => {
//       let {attributes} = model;
//       let { id, attributes } = model;
//       let type;

//       if (COMMUNITY_CATEGORIES.includes(attributes.categories)) {
//         type = 'Community';
//       } else {
//         type = 'Standalone';
//       }

//       return { id, type, ...attributes };
//     });
//   }
