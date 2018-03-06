    
    var app = new Vue({
      el: '#app',
      data: {
          commandInput: ''
      },
      methods: {
          runCommand(){
            commandArray = commandInput.value.split('\n');
            
            commandArray.forEach(function(commandLine) {
                if (commandLine.includes('PLACE')) {
                  placeRobot(commandLine);
                }
                if (commandLine == 'MOVE') {
                  moveRobot(ToyRobot);
                }
                if (commandLine == 'LEFT' || commandLine == 'RIGHT') {
                  robotDirection(ToyRobot, commandLine)
                }
                if (commandLine == 'REPORT') {
                  reportRobot(ToyRobot);
                }
            });
          }
      }
    });


    /** Defining the Table size **/
    var tableSize = {x: 5, y: 5};

    /** Robot state **/
    var ToyRobot = {
      placed : false,
      direction : false,
      position : {
        x : null,
        y : null
      }
    };


    /************************************
    ************* Place Robot ***********
    ************************************/

    function placeRobot(commandLine) {
      commandLine = commandLine.split(/[ ,]+/);
      placeCommand = commandLine[0], placeX = commandLine[1], placeY = commandLine[2], placeDirection = commandLine[3];

      if (placeCommand == "PLACE") {

        if (placeX >= 0 && placeX <= tableSize.x) {
          ToyRobot.position.x = placeX;
          ToyRobot.placed = true;
        } else {
          return false
        }
        if (placeY >= 0 && placeY <= tableSize.y) {
          ToyRobot.position.y = placeY;
          ToyRobot.placed = true;
        } else {
          return false
        }
        ToyRobot.direction = placeDirection;
      }
      else {
        alert("Failure! First command must be to place robot on table");
      }
    }


    /************************************
    ** Move robot in current direction **
    ************************************/

    function moveRobot(ToyRobot) {
      
      // Terminate if Robot is not placed
      if (ToyRobot.placed == false) {
        return false;
      }

      var x = ToyRobot.position.x;
      var y = ToyRobot.position.y;

      switch (ToyRobot.direction) {
        case 'NORTH':
          if (++y < tableSize.y) {
            ToyRobot.position = {x: x, y: y}
          }
          break;
        case 'EAST':
          if (++x < tableSize.x) {
            ToyRobot.position = {x: x, y: y}
          }
          break;
        case 'SOUTH':
          if (--y >= 0) {
            ToyRobot.position = {x: x, y: y};
          }
          break;
        case 'WEST':
          if (--x >= 0) {
            ToyRobot.position = {x: x, y: y}
          }
          break;
        default:
          break;
      }
    };


    /*********************************
    **** Map for turning the robot ***
    *********************************/
    var directionMap = {
      NORTH: {
        LEFT: 'WEST',
        RIGHT: 'EAST'
      },
      EAST: {
        LEFT: 'NORTH',
        RIGHT: 'SOUTH'
      },
      SOUTH: {
        LEFT: 'EAST',
        RIGHT: 'WEST'
      },
      WEST: {
        LEFT: 'SOUTH',
        RIGHT: 'NORTH'
      }
    };


    /*********************************
    **** Turn the robot and update ***
    *********************************/
    function robotDirection(ToyRobot, commandLine) {

      // Terminate if Robot is not placed
      if (ToyRobot.placed == false) {
        return false;
      }

      currentDirection = ToyRobot.direction;
      newDirection = directionMap[currentDirection][commandLine];
      ToyRobot.direction = newDirection
    };


    /*********************************
    **** Report on robot position  ***
    *********************************/
    function reportRobot(ToyRobot) {
        // Terminate if Robot is not placed
        if (ToyRobot.placed == false) {
          return false;
        }

        endXPos = ToyRobot.position.x;
        endYPos = ToyRobot.position.y;
        endDirection = ToyRobot.direction;

        console.log(ToyRobot);

        var app2 = new Vue({
          el: '#report',
          data: {
            report: 'Output: ' + endXPos + ',' + endYPos + ',' + endDirection
          }
        })
    }  




