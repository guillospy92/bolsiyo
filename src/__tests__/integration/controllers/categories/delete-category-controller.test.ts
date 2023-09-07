import {givenEmptyDataBase} from '../../../helpers/database.helper';
import {expect} from '@loopback/testlab';
import {getServiceApplication} from '../../../instances/test-instances.memory';

import {DeleteCategoryController} from '../../../../controllers';
import {givenCategory} from '../../../helpers/create-category.helper';

const assert = require('chai').assert;

describe('DeleteCategoryController (integration)', () => {
  beforeEach(givenEmptyDataBase);
  it('delete category success', async () => {
    try {
      const category = await givenCategory();
      await getController().deleteById(category.getId())
    } catch (e) {
      assert.fail();
    }
  });

  it('delete category id not exists', async () => {
    try {
      await getController().deleteById(0)
      assert.fail();
    } catch (e) {
      expect(e.message).eql('Entity not found: categories with id 0');
    }
  });
});

function getController(): DeleteCategoryController {
  const serviceApplication = getServiceApplication();
  return new DeleteCategoryController(
    serviceApplication.categoryService,
  );
}
