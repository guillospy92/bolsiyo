import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {givenBusiness} from '../../../helpers/create-business.helper';
import {getServiceApplication} from '../../../instances/test-instances.memory';
import {expect} from '@loopback/testlab';
import {CategoryDto} from '../../../../dtos/bussiness.dto';
import {CreateCategoryController} from '../../../../controllers';

const assert = require('chai').assert;


describe('CategoryController (integration)', () => {
  const categoryDto = getDataInitial();
  beforeEach(givenEmptyDataBase);

  it('create category success', async () => {
    const business = await givenBusiness();
    categoryDto.businessId = business.getId();
    const response = await getController().create(categoryDto);

    expect(response.id).not.null();
    expect(response.name).eql(categoryDto.name);
  });
  it('create category business not exists', async () => {
    try {
      categoryDto.businessId = 0;
      await getController().create(categoryDto);
      assert.fail();
    } catch (e) {
      expect(e.message).eql('error not exist business');
    }
  });
});


function getController(): CreateCategoryController {
  const serviceApplication = getServiceApplication();

  return new CreateCategoryController(
    serviceApplication.categoryService,
    serviceApplication.businessService
  );
}

function getDataInitial(): CategoryDto {
  const categoryDto = new CategoryDto();
  categoryDto.name = 'category name';
  return categoryDto;
}
