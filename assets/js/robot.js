    var app = new Vue({
      el: '#app',
      data: {
          commandInput: ''
      },
      methods: {
          runCommand(){
            var commandArray = commandInput.value.split('\n');

            //Place array
            var placeArray = commandArray[0].split(/[ ,]+/);
            placeRobot(placeArray);
            //console.log(ToyRobot);
          }
      }
    });



    /** Defining the Table size - 0,1,2,3,4 **/
    var tableSize = {x: 4, y: 4};

    /** Robot state **/
    var ToyRobot = {
      placed : false,
      direction : false,
      position : {
        x : null,
        y : null
      }
    };


    function placeRobot(placeArray) {
      var placeCommand = placeArray[0], placeX = placeArray[1], placeY = placeArray[2], placeDirection = placeArray[3];

      if (placeCommand == "PLACE") {
        ToyRobot.placed = true;

        if (placeX >= 0 && placeX <= tableSize.x) {
          ToyRobot.position.x = placeX;
        } else {
          return false
        }
        if (placeY >= 0 && placeY <= tableSize.y) {
          ToyRobot.position.y = placeY;
        } else {
          return false
        }
        ToyRobot.direction = placeDirection;
        
        console.log(ToyRobot);
      }
      else {
        alert("Failure! First command must be to place robot on table");
      }
    }


    

    


    
    //console.log(tableSize.x);



    /** Map for turning the robot **/
    var directionMap = {
      north: {
        value: 'north',
        left: 'west',
        right: 'east'
      },
      east: {
        value: 'east',
        left: 'north',
        right: 'south'
      },
      south: {
        value: 'south',
        left: 'east',
        right: 'west'
      },
      west: {
        value: 'west',
        left: 'south',
        right: 'north'
      }
    };

    console.log(directionMap);