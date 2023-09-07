import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {getServiceApplication} from '../../../instances/test-instances.memory';
import {givenBusiness} from '../../../helpers/create-business.helper';
import {givenCategory} from '../../../helpers/create-category.helper';
import {expect} from '@loopback/testlab';
import {ListCategoryController} from '../../../../controllers/categories/list-category.controller';

describe('ListCategoryController (integration)', () => {
  beforeEach(givenEmptyDataBase);
  it('list category success', async () => {
    const business = await givenBusiness();
    const categoryOne = await givenCategory({
      'businessId': business.getId()
    });

    const categoryTwo = await givenCategory({
      'businessId': business.getId()
    });

    const serviceApplication = getServiceApplication();
    const controller = new ListCategoryController(
      serviceApplication.categoryService,
    );
    const response = await controller.list(business.getId());

    const wantExpect = [
      {
        id: categoryOne.getId(),
        name: categoryOne.name,
        businessId: business.getId()
      },
      {
        id: categoryTwo.getId(),
        name: categoryTwo.name,
        businessId: business.getId()
      }
    ];

    expect(response).to.eql(wantExpect);
  });
});
