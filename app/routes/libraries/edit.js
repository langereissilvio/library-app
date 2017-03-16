import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('library', params.library_id);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('title', 'Edit library');
    controller.set('buttonLabel', 'Save changes');
  },

  renderTemplate() {
    this.render('libraries/form');
  },

  actions: {
    //save library and return back to the libraries route
    saveLibrary(newLibrary) {
      newLibrary.save().then(() => this.transitionTo('libraries'));
    },
    //When the user tries to leave the page without saving, ember will check
    //in the model for any unsaved changes with the computed 'hasDirtyAttributes'
    //If any found, a dialog will be sent to warn the user that unsaved changes
    //will be lost when exiting. Depending on the choice, changes will be
    //deleted or the transition to libraries will be cancelled
    willTransition(transition) {

      let model = this.controller.get('model');

      //checks for not-saved data
      if(model.get('hasDirtyAttributes')) {
        //dialog
        let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form.");

        if (confirmation) {
          //delete non-saved changes
          model.rollbackAttributes();
        } else {
          //cancel transition and stay on page
          transition.abort();
        }
      }
    }
  }
});
