/**
 * A Nightwatch page object. The page object name is the filename.
 *
 * Example usage:
 *   browser.page.homepage.navigate()
 *
 * For more information on working with page objects see:
 *   https://nightwatchjs.org/guide/working-with-page-objects/
 *
 */

module.exports = {
  url: '/register',
  commands: [],

  // A page object can have elements
  elements: {
    appContainer: '#app',
  },

  // Or a page objects can also have sections
  sections: {
    app: {
      selector: '#app',

      sections: {
        form: {
          selector: '.form-signin',

          elements: {
            username: {
              selector: '#inputUsername',
            },
            password: {
              selector: '#inputPassword',
            },
            passwordConfirm: {
              selector: '#inputPasswordConfirmation',
            },
            submit: {
              selector: '#submitButton',
            },
            cancel: {
              selector: '#cancelButton',
            },
          },
        },
      },
    },
  },
};
