
module.exports = function command(scope) {

    var event = {
        code: scope.label,
        user: scope.user.id
    };

    // if one house is detected, save the event in this house
    if(scope.houses && scope.houses.length == 1){
        event.house = scope.houses[0].id;
    }

    // if one rooms is detected, save the event in this room
    if(scope.rooms && scope.rooms.length == 1){
        event.room = scope.rooms[0].id;
    }
    
    return gladys.event.create(event)
        .then(() => {

            var response = {};

            switch(scope.label) {
                case 'back-at-home':
                    response.label = 'user-back-at-home'
                break;

                case 'left-home': 
                    response.label = 'user-leaving-home';
                break;

                case 'going-to-sleep':
                    response.label = 'user-going-to-sleep';
                break;

                case 'wake-up': 
                    response.label = 'user-waking-up';
                break;
            }

            return response;
        });
};