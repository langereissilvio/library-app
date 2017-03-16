import Ember from 'ember';

export default Ember.Controller.extend({

  responseMessage: '',
  emailAddress: '',
  message: '',

  //computed props
  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isLongEnough: Ember.computed.gte('message.length', 5),

  //check if both computed are true
  isValid: Ember.computed.and('isValidEmail', 'isLongEnough'),
  //reverse the result
  isNotValid: Ember.computed.not('isValid'),

  actions: {

    saveInvitation(){
      const email = this.get('emailAddress');
      const message = this.get('message');

      const newContact = this.store.createRecord('contact', { email: email, message: message });
      newContact.save().then((response) => {
        this.set('responseMessage', `Thank you! We saved your comment with the following id: ${response.get('id')}`);
        this.set('emailAddress', '');
        this.set('message', '');
      });
    }
  }
});
