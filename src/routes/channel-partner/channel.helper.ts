import { Op } from 'sequelize';
import { ChannelPartnerStatusModel } from '../../db/models/ChannelPartnerStatus';

export function buildSearchParams (filterParams: any) {
  const params = Object.keys(filterParams).reduce((acc, key) => {
    const value = filterParams[key];
    if (key === 'search') {
      return {
        ...acc,
        [Op.or]: [
          { name: {[Op.iLike]: `%${value}%`} },
          { company: {[Op.iLike]: `%${value}%`} },
          { email: {[Op.iLike]: `%${value}%`} },
          { phone: {[Op.iLike]: `%${value}%`} },
          { address: {[Op.iLike]: `%${value}%`} },
        ],
      };
    }
    if (key === '$status.name$' && value !== '') {
      return {
        ...acc,
        [key]: value,
      };
    }
    if (key === 'verified') {
      return {
        ...acc,
        [key]: value,
      };
    }
    return {
      ...acc,
      [key]: {[Op.iLike]: `%${value}%`},
    };
  }, {});

  return params;
}

export function buildSortParams (sort: {orderColumn: string, orderType: string}): any[] {

  const defaultOrderType = 'ASC';

  switch (sort.orderColumn) {
    case '$status.name$':
      return [{model: ChannelPartnerStatusModel, as: 'status'}, 'name', sort.orderType || defaultOrderType];
    case undefined:
      return ['id', sort.orderType || defaultOrderType];
    default:
      return [sort.orderColumn, sort.orderType || defaultOrderType];
  }
}