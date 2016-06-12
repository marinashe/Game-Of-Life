"use strict";


var isRunning = false;

function life (board) {
    return board.map(function (row, y){
        return row.map(function (cell, x) {
            let n = 0;
            if (y > 0){
                n += x > 0 ? board[y-1][x-1] : 0;
                n += board[y-1][x];
                n += x < row.length-1 ? board[y-1][x+1] : 0;
                    }
            n += x < row.length-1 ? board[y][x+1] : 0;
            if ( x > 0){
                n += board[y][x-1];
                n += y < board.length-1 ? board[y+1][x-1] : 0;

            }
            if (y < board.length-1) {
                n += board[y+1][x];
                n += x < row.length-1 ? board[y+1][x+1] : 0;

            }

            return n===3 || (n === 2 && cell) ? 1 : 0;

        })
    })

}

function toArray () {
    var board = [];
    var row = [];

    $("table#field").find('tr').map(function (j, obj1) {
        row = [];
        $(obj1).find('td').each( function (i, obj2) {
            if (isAlive($(obj2))){
                row.push(1);
            } else {
                row.push(0);
            };
        });
        console.log(row);
        board.push(row);
    });

    return board;
}


function updateCell(el) {
    el.toggleClass("alive");
}


function isAlive (el) {
  return el.attr('class') === 'alive';
}

function generation () {
    var board = life(toArray());

    $("table#field").find('tr').map(function (j, obj1) {
        $(obj1).find('td').map( function (i, obj2) {
            if (board[j][i] === 1){
                if (!isAlive($(obj2))) {
                   updateCell($(obj2));
                };
            } else {
                if (isAlive($(obj2))) {
                   updateCell($(obj2));
                };
            };
        });

    });

}

function round () {
    generation();
    if (isRunning) {
        setTimeout(round, 1000);
    }
}

$("button#create-field").click( function () {
    var el, tr, td;
    var h = +$("input#height").val();

    var w = +$("input#weight").val();

    $("table#field").html('');
    for (let j = 0; j < h; j++){
        tr = $('<tr></tr>');
        for (let i = 0; i < w; i++){
            td = $('<td></td>');
            td.click( function () {
                el = $(this);
                updateCell(el);

            });
            $(tr).append(td);
        }

        $("table#field").append(tr);
    }
    $("button#start-game").removeClass('hide');
});

$("button#start-game").click( function () {

    isRunning = !isRunning;
    if (isRunning) {
        $(this).html('Stop');
        round();
    } else {
        $(this).html('Start');
    };
});