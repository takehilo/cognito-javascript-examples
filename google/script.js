// Sign in to Google and get credentials from Cognito
function onSignIn(googleUser) {
  if (googleUser.isSignedIn()) {
    console.log('Successfully signed in to Google!')
    var authResult = googleUser.getAuthResponse();

    var params = {
      IdentityPoolId: 'IDENTITY_POOL_ID',
      Logins: {
        'accounts.google.com': authResult.id_token,
      }
    };

    AWS.config.region = 'REGION';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
    AWS.config.credentials.get(function(err) {
      if (err) {
        console.log(err, err.stack);
        return;
      } else {
        console.log('Successfully got credentials from Cognito!');
      }
    });
  }
}

// Sign out
document.querySelector('#signOutButton')
  .addEventListener('click', function(e) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log('Successfully signed out from Google!');
    })
  }, false);

// Execute Lambda function
document.querySelector('#execute')
  .addEventListener('click', function(e) {
    var lambda = new AWS.Lambda();
    var params = {
      FunctionName: 'FUNCTION_NAME',
      Payload: JSON.stringify({key: 'value'})
    };
    lambda.invoke(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully executed Lambda function!');
        console.log(data);
      }
    });
  });
