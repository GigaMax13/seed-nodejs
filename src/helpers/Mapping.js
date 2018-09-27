import Conversion from './Conversion';

class Mapping {
  static camelcase2Underscore(data) {
    if (data !== undefined && data !== null) {
      if (data.constructor === Array) {
        return data.map((item) => {
          return Mapping.camelcase2Underscore(item);
        });
      } else if (data.constructor === Object) {
        return Object.keys(data).reduce((total, key) => {
          const temp = {};

          temp[key.replace(/([A-Z])+/g, v => (`_${v.toLowerCase()}`))] = Mapping.camelcase2Underscore(data[key]);

          return {
            ...total,
            ...temp,
          };
        }, {});
      }
    }

    return data;
  }

  static underscore2Camelcase(data) {
    if (data !== undefined && data !== null) {
      if (data.constructor === Array) {
        return data.map((item) => {
          return Mapping.underscore2Camelcase(item);
        });
      } else if (data.constructor === Object) {
        const obj = {};

        Object.keys(data).forEach((key) => {
          obj[Conversion.underscore2Camelcase(key)] = Mapping.underscore2Camelcase(data[key]);
        });

        return obj;
      }
    }

    return data;
  }
}

export default Mapping;
