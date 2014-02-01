angular.module('demo')

.controller('IdeasController', ['$rootScope', '$scope', '$state', '$stateParams', 'MonsterService', function($rootScope, $scope, $state, $stateParams, MonsterService) {
  
  $scope.createMonster = function() {
    // new up the model

    var f1Drivers = [
      'Sebastian Vettel',
      'Fernando Alonso',
      'Kimi Raikkonen',
      'Lewis Hamilton',
      'Mark Webber',
      'Nico Rosberg',
      'Felipe Massa',
      'Romain Grosjean',
      'Jenson Button',
      'Paul di Resta',
      'Nico Hulkenberg',
      'Adrian Sutil',
      'Sergio Perez',
      'Daniel Ricciardo',
      'Jean-Eric Vergne',
      'Pastor Maldonado',
      'Esteban Gutierrez',
      'Valtteri Bottas',
      'Jules Bianchi',
      'Charles Pic',
    ];

    var reasons = [
      'Because what the hell is a: "through button bias cut front and centre back box pleat with hanger loop, finished with mitred button cuffs, bias cut spade chest pocket, contrast lined back yoke and curved hem." - (bensherman.com)',
      'Missed the returns window? Fuck you very much.',
      'On mobile? Forget about it',
      'They know I\'m a dude, but they keep emailing me chicks shoes! WTF',
      'I don\'t even wanna think about dealing with customer support or the lack thereof',
      'I don\'t have to pay to try clothes on in a store, so why do I have to pay to try 2 different sizes online?',
      'Because I know I\'m gonna get screwed with the returns',
      'Paid $80 for a shirt that doesn\'t fit because I lost the returns form',
      'Because they\'re banking on me to screw up the returns',
      '"Oh sorry sir, didn\'t you read the terms? You pay return shipping and a 10% restocking fee"',
      'What happens if it doesn\'t fit?',
      'Why pay for shipping when I can go to the mall?'
    ];

    var randomNumber = Math.floor(Math.random()*f1Drivers.length);

    var randomNumber2 = Math.floor(Math.random()*reasons.length);

    $scope.masterDetailCtrl.collection.addMonster(f1Drivers[randomNumber], reasons[randomNumber2]).then(function() {

      alert('You created a new object for: ' + $scope.masterDetailCtrl.collection.first().get('name'));

    });

  }



}]);