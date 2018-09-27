import { expect } from 'chai';
import Moment from 'moment-timezone';
import Conversion from './Conversion';

describe('#Conversion', () => {
  describe('Smoke tests', () => {
    it('Class', () => {
      expect(Conversion).to.exist;
    });

    it('toLocal', () => {
      expect(Conversion.toLocal).to.exist;
      expect(Conversion.toLocal).to.be.a('function');
    });

    it('toUTC', () => {
      expect(Conversion.toUTC).to.exist;
      expect(Conversion.toUTC).to.be.a('function');
    });

    it('toUnixEpoch', () => {
      expect(Conversion.toUnixEpoch).to.exist;
      expect(Conversion.toUnixEpoch).to.be.a('function');
    });

    it('format', () => {
      expect(Conversion.format).to.exist;
      expect(Conversion.format).to.be.a('function');
    });

    it('number', () => {
      expect(Conversion.number).to.exist;
      expect(Conversion.number).to.be.a('function');
    });

    it('float', () => {
      expect(Conversion.float).to.exist;
      expect(Conversion.float).to.be.a('function');
    });

    it('cpf', () => {
      expect(Conversion.cpf).to.exist;
      expect(Conversion.cpf).to.be.a('function');
    });

    it('cnpj', () => {
      expect(Conversion.cnpj).to.exist;
      expect(Conversion.cnpj).to.be.a('function');
    });

    it('cep', () => {
      expect(Conversion.cep).to.exist;
      expect(Conversion.cep).to.be.a('function');
    });

    it('underscore2Camelcase', () => {
      expect(Conversion.underscore2Camelcase).to.exist;
      expect(Conversion.underscore2Camelcase).to.be.a('function');
    });

    it('capitalize', () => {
      expect(Conversion.capitalize).to.exist;
      expect(Conversion.capitalize).to.be.a('function');
    });
  });

  describe('Dates', () => {
    let utcDate;

    beforeEach(() => {
      utcDate = Moment.utc().format();
    });

    describe('#toLocal', () => {
      it('should return the correct timezone date', () => {
        expect(Conversion.toLocal(utcDate, 'America/Sao_Paulo').format()).to.equal(Moment.utc(utcDate).tz('America/Sao_Paulo').format());
      });
    });

    describe('#toUTC', () => {
      it('should return the utc timezone date', () => {
        expect(Conversion.toUTC(Moment().format(), 'America/Sao_Paulo').format()).to.equal(utcDate);
      });
    });

    describe('#toUnixEpoch', () => {
      it('should return the epoch from a date', () => {
        const epoch = new Date(utcDate).getTime();
        expect(Conversion.toUnixEpoch(utcDate)).to.equal(epoch);
      });
    });
  });

  describe('#format', () => {
    it('should return the formatted text', () => {
      expect(Conversion.format('test', 'SS/SS')).to.equal('te/st');
    });
  });

  describe('#number', () => {
    it('should return the integer number', () => {
      expect(Conversion.number('12 34 - 5')).to.equal(12345);
    });
  });

  describe('#float', () => {
    it('should return the float number', () => {
      expect(Conversion.float('12. 34 - 5')).to.equal(12.345);
    });
  });

  describe('#cpf', () => {
    it('should return the formatted cpf', () => {
      expect(Conversion.cpf('11122233344')).to.equal('111.222.333-44');
    });
  });

  describe('#cnpj', () => {
    it('should return the formatted cnpj', () => {
      expect(Conversion.cnpj('11222333444455')).to.equal('11.222.333/4444-55');
    });
  });

  describe('#cep', () => {
    it('should return the formatted cep', () => {
      expect(Conversion.cep('11111222')).to.equal('11111-222');
    });
  });

  describe('#underscore2Camelcase', () => {
    it('should change the underscore for camelcase', () => {
      expect(Conversion.underscore2Camelcase('id_user')).to.equal('idUser');
      expect(Conversion.underscore2Camelcase('id_user_login')).to.equal('idUserLogin');
    });
  });

  describe('#capitalize', () => {
    it('should capitalize the text', () => {
      const capitalized = 'Aaaa';
      expect(Conversion.capitalize('AAAA')).to.equal(capitalized);
      expect(Conversion.capitalize('AaAa')).to.equal(capitalized);
      expect(Conversion.capitalize('aaaa')).to.equal(capitalized);
    });
  });
});
