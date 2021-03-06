var Grille = function(grille_x, grille_y)
{
    let grille;
    this.grille_x = grille_x; 
    this.grille_y = grille_y;

    this.init = function(){
        grille = new Array();
        let table = document.getElementById("tetris");
        table.innerHTML="";

        for (let i=0; i<grille_y; i++){
            grille[i] = new Array();
            tr = table.insertRow(0);
            for (let j=0; j<grille_x; j++){
                grille[i][j] = j;
                td = tr.insertCell(0);
                td.setAttribute("class","cell_tetris");
                td.setAttribute("id","cell_tetris_"+i+j);
            }
        }
    },
    this.get = function(){
        return grille;
    },
    this.getNb = function(y,x){
        return grille[y][x];
    },
    this.getPiece = function(y,x,str){
        if (str==="down"){
            let suiv = y-1;
            if (!isNaN(grille[suiv][x]) || grille[suiv][x]===grille[y][x])
                return true;
            return false;
        }else if(str==="left"){
            let left;x<grille_x?left=x+1:left=x;
            if (!isNaN(grille[y][left]) || grille[y][left]===grille[y][x])
                return true;
            return false;
        }else if (str==="right"){
            let right;x>0?right=x-1:right=x;
            if (!isNaN(grille[y][right]) || grille[y][right]===grille[y][x])
                return true;
            return false;
        }else if (str==="up"){
            if (!isNaN(grille[y][x]))
                return true;
            return false;
        }
    },
    this.set = function(y, x, pion){
        grille[y][x] = pion;
    },
    this.move = function(y1, x1, y, x, str){
        if (str==="down"){
            grille[y][x] = grille[++y][x];
        }
        if (str==="refresh_down"){
            grille[++y][x] = x;
        }
        if (str==="left"){
            grille[y][x] = grille[y][--x];
        }
        if (str==="refresh_left"){
            grille[y][--x] = x;
        }
        if (str==="right"){
            grille[y][x] = grille[y][++x];
        }
        if (str==="refresh_right"){
            grille[y][++x] = x;
        }
        if (str==="up"){
            grille[y][x] = grille[y1][x1];
            grille[y1][x1] = x+1;
        }
    },
    this.change = function(nb){
        for (let i=nb;i<grille_y-1;i++){
            for (let j=0;j<grille_x;j++){
                grille[i][j] = grille[i+1][j];
            }
        }
    },
    this.refresh = function(){
        let cell;
        for (let i=0;i<grille_y;i++){
            for (let j=0; j<grille_x; j++){
                cell = document.getElementById("cell_tetris_"+i+j);
                if(grille[i][j][0] === "X"){
                    cell.style.backgroundColor = "#008000";
                    cell.setAttribute("class","cell_tetris_x");
                }
                else if (grille[i][j][0] === "C"){
                    cell.style.backgroundColor = "#144576";
                    cell.setAttribute("class","cell_tetris_c");
                }
                else if (grille[i][j][0] === "V"){
                    cell.style.backgroundColor = "#F30000";
                    cell.setAttribute("class","cell_tetris_v");
                }
                else if (grille[i][j][0] === "B"){
                    cell.style.backgroundColor = "#CEE812";
                    cell.setAttribute("class","cell_tetris_b");
                } 
                else if (grille[i][j][0] === "T"){
                    cell.style.backgroundColor = "#4B0082";
                    cell.setAttribute("class","cell_tetris_t");
                }
                else if (grille[i][j][0] === "Z"){
                    cell.style.backgroundColor = "#C0C0C0";
                    cell.setAttribute("class","cell_tetris_z");
                }
                else if (grille[i][j][0] === "J"){
                    cell.style.backgroundColor = "#B98B21";
                    cell.setAttribute("class","cell_tetris_j");
                }
                else{
                    /* Opacite nulle */
                    //cell.style.backgroundColor = "#000000";
                    cell.setAttribute("class","cell_tetris");
                }
            }
        }
    },
    this.reset = function(){
        for (let i=0; i<grille_y; i++){
            grille[i] = new Array();
            for (let j=0; j<grille_x; j++){
                grille[i][j] = j;
                cell = document.getElementById("cell_tetris_"+i+j);
                cell.style.backgroundColor = "#000000";
                cell.setAttribute("class","cell_tetris");
            }
        }
    }
}

var Piece = function(nb, grille)
{
    this.nb = nb;
    let pion;
    let pos1;
    let pos2;
    let pos3;
    let pos4;
    let less = false;
    let number = Math.floor(Math.random()*1000);

    this.init = function(){
        if (this.nb === 1){
            pion = "X"+number;
            pos1 = [grille.grille_y-1,(grille.grille_x/2)-1];
            pos2 = [grille.grille_y-1,(grille.grille_x/2)-2];
            pos3 = [grille.grille_y-1,grille.grille_x/2];
            pos4 = [grille.grille_y-1,(grille.grille_x/2)+1];
        }
        else if(this.nb === 2){
            pion = "C"+number;
            pos1 = [grille.grille_y-1,grille.grille_x/2];
            pos2 = [grille.grille_y-1,(grille.grille_x/2)-1];
            pos3 = [(grille.grille_y-1)-1,(grille.grille_x/2)];
            pos4 = [(grille.grille_y-1)-2,(grille.grille_x/2)];
        }
        else if(this.nb === 3){
            pion = "V"+number;
            pos1 = [grille.grille_y-1,grille.grille_x/2];
            pos2 = [(grille.grille_y-1)-1,(grille.grille_x/2)];
            pos3 = [(grille.grille_y-1)-1,(grille.grille_x/2)-1];
            pos4 = [(grille.grille_y-1)-2,(grille.grille_x/2)-1];
        }
        else if(this.nb === 4){
            pion = "B"+number;
            pos1 = [grille.grille_y-1,(grille.grille_x/2)-1];
            pos2 = [grille.grille_y-1,(grille.grille_x/2)];
            pos3 = [(grille.grille_y-1)-1,(grille.grille_x/2)-1];
            pos4 = [(grille.grille_y-1)-1,(grille.grille_x/2)];
        }
        else if(this.nb === 5){
            pion = "T"+number;
            pos1 = [grille.grille_y-1,grille.grille_x/2];
            pos2 = [grille.grille_y-1,(grille.grille_x/2)-1];
            pos3 = [grille.grille_y-1,(grille.grille_x/2)+1];
            pos4 = [(grille.grille_y-1)-1,(grille.grille_x/2)];
        }
        else if(this.nb === 6){
            pion = "Z"+number;
            pos1 = [grille.grille_y-1,(grille.grille_x/2)+1];
            pos2 = [grille.grille_y-1,(grille.grille_x/2)];
            pos3 = [(grille.grille_y-1)-1,(grille.grille_x/2)];
            pos4 = [(grille.grille_y-1)-1,(grille.grille_x/2)-1];
        }
        else if(this.nb === 7){
            pion = "J"+number;
            pos1 = [(grille.grille_y-1),grille.grille_x/2];
            pos2 = [(grille.grille_y-1)-1,(grille.grille_x/2)];
            pos3 = [(grille.grille_y-1)-2,(grille.grille_x/2)];
            pos4 = [(grille.grille_y-1)-2,(grille.grille_x/2)-1];
        }
        if(isNaN(grille.getNb(pos1[0],pos1[1])) || isNaN(grille.getNb(pos2[0],pos2[1]))  || isNaN(grille.getNb(pos3[0],pos3[1])) || isNaN(grille.getNb(pos4[0],pos4[1])))
            return false;
        return true;
    }
    this.ajoutGrille = function (){
        grille.set(pos1[0],pos1[1],pion);
        grille.set(pos2[0],pos2[1],pion);
        grille.set(pos3[0],pos3[1],pion);
        grille.set(pos4[0],pos4[1],pion);

        grille.refresh();
    },
    this.down = function (){
        if ((pos1[0]>0 && pos2[0]>0 && pos3[0]>0 && pos4[0]>0) && grille.getPiece(pos1[0],pos1[1],"down") && grille.getPiece(pos2[0],pos2[1],"down") && grille.getPiece(pos3[0],pos3[1],"down") && grille.getPiece(pos4[0],pos4[1],"down"))
        {
            grille.move(0, 0, --pos1[0], pos1[1], "down");
            grille.move(0, 0, --pos2[0], pos2[1], "down");
            grille.move(0, 0, --pos3[0], pos3[1], "down");
            grille.move(0, 0, --pos4[0], pos4[1], "down");

            if (nb===1){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_down");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_down");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_down");
            }else if(nb===11){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
            }else if(nb===2 || nb===4 || nb===23){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_down");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
            }else if(nb===22 || nb===56){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_down");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_down");
            }else if(nb===24 || nb===5){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_down");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_down");
            }else if(nb===3 ){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_down");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_down");
            }else if(nb===33 || nb===6 || nb===77 || nb===79){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_down");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_down");
            }else if(nb===55){
                grille.move(0, 0, pos3[0], pos3[1], "refresh_down");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
            }else if(nb===57){
                grille.move(0, 0, pos3[0], pos3[1], "refresh_down");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_down");
            }else if(nb===66 || nb===7 || nb===78){
                grille.move(0, 0, pos4[0], pos4[1], "refresh_down");
                grille.move(0, 0, pos1[0], pos1[1], "refresh_down");
            }
            grille.refresh();
        }else{
            less=true;
            this.motionless();
        }
    },
    this.left = function (){
        if ((pos1[1]<grille.grille_x-1 && pos2[1]<grille.grille_x-1 && pos3[1]<grille.grille_x-1 && pos4[1]<grille.grille_x-1) && grille.getPiece(pos1[0],pos1[1],"left") && grille.getPiece(pos2[0],pos2[1],"left") && grille.getPiece(pos3[0], pos3[1],"left") && grille.getPiece(pos4[0], pos4[1],"left"))
        {
            grille.move(0, 0, pos1[0], ++pos1[1], "left");
            grille.move(0, 0, pos2[0], ++pos2[1], "left");
            grille.move(0, 0, pos3[0], ++pos3[1], "left");
            grille.move(0, 0, pos4[0], ++pos4[1], "left");
                    
            if (nb===1){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_left");
            }else if (nb===11){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_left");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_left");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_left");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_left");
            }else if (nb===2 || nb===23 || nb===55 || nb===66 || nb===78 ){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_left");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_left");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_left");
            }else if (nb===22 || nb===24 || nb===5 || nb===56 || nb===6){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_left");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_left");
            }else if (nb===3){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_left");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_left");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_left");
            }else if (nb===33 || nb===77 || nb===79){
                grille.move(0, 0, pos3[0], pos3[1], "refresh_left");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_left");
            }else if (nb===4){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_left");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_left");
            }else if (nb===57 || nb===7){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_left");
                grille.move(0, 0, pos1[0], pos1[1], "refresh_left");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_left");
            }
            grille.refresh();
        }
    },
    this.right = function (){
        if ((pos1[1]>0 && pos2[1]>0 && pos3[1]>0 && pos4[1]>0) && grille.getPiece(pos1[0],pos1[1],"right") && grille.getPiece(pos2[0],pos2[1],"right") && grille.getPiece(pos3[0], pos3[1],"right") && grille.getPiece(pos4[0], pos4[1],"right"))
        {
            grille.move(0, 0, pos1[0], --pos1[1], "right");
            grille.move(0, 0, pos2[0], --pos2[1], "right");
            grille.move(0, 0, pos3[0], --pos3[1], "right");
            grille.move(0, 0, pos4[0], --pos4[1], "right");

            if (nb===1){
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
            }else if (nb===11){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_right");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_right");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_right");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
            }else if (nb===2 || nb===55 || nb===66){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_right");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_right");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
            }else if (nb===23 || nb===7 || nb===78){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_right");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_right");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_right");
            }else if (nb===24 || nb===77){
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
                grille.move(0, 0, pos1[0], pos1[1], "refresh_right");
            }else if (nb===3 ){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_right");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_right");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
            }else if (nb===33 || nb===22){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_right");
                grille.move(0, 0, pos1[0], pos1[1], "refresh_right");
            }else if (nb===4){
                grille.move(0, 0, pos2[0], pos2[1], "refresh_right");
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
            }else if (nb===5 || nb===56){
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_right");
            }else if (nb===6 || nb===79){
                grille.move(0, 0, pos1[0], pos1[1], "refresh_right");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_right");
            }else if (nb===57){
                grille.move(0, 0, pos4[0], pos4[1], "refresh_right");
                grille.move(0, 0, pos3[0], pos3[1], "refresh_right");
                grille.move(0, 0, pos2[0], pos2[1], "refresh_right");
            }
            grille.refresh();
        }
    },
    this.up = function(){
        y = pos1[0];x = pos1[1];y2 = pos2[0];x2 = pos2[1];y3 = pos3[0];x3 = pos3[1];y4 = pos4[0];x4 = pos4[1];
        /* Piece 1 */
        if (nb == 1){
            ybis=y+1;xbis=x+1;ybis2=y2+2;xbis2=x2+2;ybis4=y4-1;xbis4=x4-1;
            if ((pos1[0]<=22 && pos2[0]<=22 && pos3[0]<=22 && pos4[0]<=22) && grille.getPiece(ybis2,xbis2,"up") && grille.getPiece(ybis,xbis,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 11;++pos2[0];++pos2[1];
                grille.move(y2, x2, ++pos2[0], ++pos2[1], "up");
                grille.move(y, x, ++pos1[0], ++pos1[1], "up");
                grille.move(y4, x4, --pos4[0], --pos4[1], "up");
            }
        }else if (nb == 11){
            ybis=y-1;xbis=x-1;ybis2=y2-2;xbis2=x2-2;ybis4=y4+1;xbis4=x4+1;
            if ((pos1[1]>=2 && pos2[1]>=2 && pos3[1]>=2 && pos4[1]>=2 && pos1[1]<8 && pos2[1]<8 && pos3[1]<8 && pos4[1]<8) && grille.getPiece(ybis2,xbis2,"up") && grille.getPiece(ybis,xbis,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 1;--pos2[0];--pos2[1];
                grille.move(y2, x2, --pos2[0], --pos2[1], "up");
                grille.move(y, x, --pos1[0], --pos1[1], "up");
                grille.move(y4, x4, ++pos4[0], ++pos4[1], "up");
            }
        }
        /* Piece 2 */
        if (nb == 2){
            ybis=y-1;xbis=x+1;xbis2=x2+2;ybis4=y4+1;xbis4=x4-1;
            if (pos1[1]<=8 && grille.getPiece(ybis,xbis,"up") && grille.getPiece(y2,xbis2,"up") && grille.getPiece(y4,xbis4,"up")){
                nb = 22;++pos2[1];
                grille.move(y, x, --pos1[0], ++pos1[1], "up");
                grille.move(y2, x2, pos2[0], ++pos2[1], "up");
                grille.move(y4, x4, ++pos4[0], --pos4[1], "up");
            }
        }else if (nb == 22){
            ybis=y-1;xbis2=x2-1;ybis4=y4-1;xbis4=x4+1
            if(grille.getPiece(ybis,x,"up") && grille.getPiece(y2,xbis2,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 23;
                grille.move(y, x, --pos1[0], pos1[1], "up");
                grille.move(y2, x2, pos2[0], --pos2[1], "up");
                grille.move(y4, x4, --pos4[0], ++pos4[1], "up");
            }
        }else if (nb == 23){
            ybis=y+1;ybis2=y2-1;xbis2=x2-1;xbis4=x4-1;
            if (pos1[1]>=2 && grille.getPiece(ybis,x,"up") && grille.getPiece(ybis2,xbis2,"up") && grille.getPiece(y4,xbis4,"up")){
                nb = 24
                grille.move(y, x, ++pos1[0], pos1[1], "up");
                grille.move(y2, x2, --pos2[0], --pos2[1], "up");
                grille.move(y4, x4, pos4[0], --pos4[1], "up");
            }
        }else if (nb == 24){
            ybis=y+1;xbis=x-1;ybis2=y2+1;xbis4=x4+1;
            if (pos1[0]>0 && grille.getPiece(ybis,xbis,"up") && grille.getPiece(ybis2,x2,"up") && grille.getPiece(y4,xbis4,"up")){
                nb = 2
                grille.move(y, x, ++pos1[0], --pos1[1], "up");
                grille.move(y2, x2, ++pos2[0], pos2[1], "up");
                grille.move(y4, x4, pos4[0], ++pos4[1], "up");
            }
        }
        /* Piece 3 */
        if (nb == 3){
            xbis=x-1;ybis4=y4+2;xbis4=x4-1;
            if (pos1[1]>0 && pos4[1]>0 && grille.getPiece(y,xbis,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 33;++pos4[0];
                grille.move(y, x, pos1[0], --pos1[1], "up");
                grille.move(y4, x4, ++pos4[0], --pos4[1], "up");
            }
        }else if (nb == 33){
            xbis=x+1;ybis4=y4-2;xbis4=x4+1;
            if (pos1[1]<=8 && pos4[1]<=8 && grille.getPiece(y,xbis,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 3;--pos4[0];
                grille.move(y, x, pos1[0], ++pos1[1], "up");
                grille.move(y4, x4, --pos4[0], ++pos4[1], "up");
            }
        }
        /* Piece 5 */
        if (nb == 5){
            ybis3=y3+1;xbis3=x3-1;
            if (pos1[0]<=23 && grille.getPiece(ybis3,xbis3,"up")){
                nb = 55
                grille.move(y3, x3, ++pos3[0], --pos3[1], "up");
            }
        }else if (nb == 55){
            ybis4=y4+1;xbis4=x4+1;
            if (pos1[1]<=8 && grille.getPiece(ybis4,xbis4,"up")){
                nb = 56;++pos4[0];
                grille.move(y3, x3, --pos3[0], ++pos3[1], "up");
                grille.move(y4, x4, ++pos4[0], pos4[1], "up");
            }
        }else if (nb == 56){
            ybis2=y2-1;xbis2=x2+1;
            if (pos1[0]>=1 && grille.getPiece(ybis2,xbis2,"up")){
                nb = 57;--pos4[0];
                grille.move(y4, x4, --pos4[0], pos4[1], "up");
                grille.move(y2, x2, ++pos2[0], ++pos2[1], "up")
            }
        }else if (nb == 57){ //!\Attention Bug 1 case collision//!\
            ybis2=y2+1;xbis2=x2-1;ybis4=y4-1;xbis4=x4-1;ybis3=y3-1;xbis3=x3+1;
            if (pos1[1]>=1 && grille.getPiece(ybis4,xbis4,"up")){
                nb = 5;
                grille.move(y2, x2, --pos2[0], --pos2[1], "up");
            }
        }
        /* Piece 6 */
        if (nb == 6){
            xbis3=x3+1;ybis4=y4+2;xbis4=x4+1;
            if (pos1[1]>0 && pos2[1]>0 && grille.getPiece(y3,xbis3,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 66;++pos4[0];
                grille.move(y3, x3, pos3[0], ++pos3[1], "up");
                grille.move(y4, x4, ++pos4[0], ++pos4[1], "up");
            }
        }else if (nb == 66){
            xbis3=x3-1;ybis4=y4-2;xbis4=x4*1;
            if (pos1[1]>0 && pos2[1]>0 && pos1[1]<=8 && pos2[1]<=8 && grille.getPiece(y3,xbis3,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 6;--pos4[0];
                grille.move(y3, x3, pos3[0], --pos3[1], "up");
                grille.move(y4, x4, --pos4[0], --pos4[1], "up");
            }
        }
        /* Piece 7 */
        if (nb == 7){
            xbis=x+1;ybis=y-1;xbis3=x3-1;ybis3=y3+1;ybis4=y4+2;
            if (pos1[1]<9 && grille.getPiece(ybis,xbis,"up") && grille.getPiece(ybis3,xbis3,"up") && grille.getPiece(ybis4,x4,"up")){
                nb = 77;++pos4[0];
                grille.move(y, x, --pos1[0], ++pos1[1], "up");
                grille.move(y3, x3, ++pos3[0], --pos3[1], "up");
                grille.move(y4, x4, ++pos4[0], pos4[1], "up");
            }
        }else if (nb == 77){
            ybis=y+1;ybis3=y3-1;xbis3=x3+1;xbis4=x4+1;
            if (pos1[0]>0 && grille.getPiece(ybis,x,"up") && grille.getPiece(ybis3,xbis3,"up") && grille.getPiece(y4,xbis4,"up")){
                nb = 78;
                grille.move(y, x, ++pos1[0], pos1[1], "up");
                grille.move(y3, x3, --pos3[0], ++pos3[1], "up");
                grille.move(y4, x4, pos4[0], ++pos4[1], "up");
            }
        }else if (nb == 78){
            ybis=y-1;xbis3=x3+1;ybis4=y4-1;xbis4=x4-1;
            if (pos1[1]>0 && grille.getPiece(ybis,x,"up") && grille.getPiece(y3,xbis3,"up") && grille.getPiece(ybis4,xbis4,"up")){
                nb = 79;
                grille.move(y, x, --pos1[0], pos1[1], "up");
                grille.move(y3, x3, pos3[0], ++pos3[1], "up");
                grille.move(y4, x4, --pos4[0], --pos4[1], "up");
            }
        }else if (nb == 79){
            ybis=y+1;xbis=x-1;xbis3=x3-1;ybis4=y4-1;
            if (grille.getPiece(ybis,xbis,"up") && grille.getPiece(y3,xbis3,"up") && grille.getPiece(ybis4,x4,"up")){
                nb = 7;
                grille.move(y, x, ++pos1[0], --pos1[1], "up");
                grille.move(y3, x3, pos3[0], --pos3[1], "up");
                grille.move(y4, x4, --pos4[0], pos4[1], "up");
            }
        }
        grille.refresh();
    },
    this.motionless = function (){
        return less;
    }
}

var ClickAction = function(str){
    p.down();
    this.action = function(p){
        if (str !=""){
            switch(str){
                case 'b_bas':p.down();console.log('action_down');break;
                case 'b_gauche':p.left();break;
                case 'b_droit':p.right();break;
                case 'b_action':p.up();break;
            }
        }
    }
}

var Ecouteurs = function(p){
    this.handleEvent = function(e){
        switch(e.type){
            case 'keydown':
                if(e.key==="l") {
                    p.down();
                }
                if(e.key==="a") {
                    p.left();
                }
                if(e.key==="p") {
                    p.right();
                }
                if(e.key==="s") {
                    p.up();
                }
            break;
        }
    },
    this.verifEvent = function (p){
        if (p.motionless()){
            document.removeEventListener('keydown', this.handleEvent, false);
            return false;
        }
        return true;
    }
    document.addEventListener('keydown', this.handleEvent, false);
}


var Jeu = function(){
    let score = 0;
    let niveau = 1;
    let ligne = 0;
    let termine = false;
    let liste_piece = [];
    let grille_miniature = new Array();
    this.getCptLigne = ()=>{
        document.getElementById("aff_ligne").textContent = ligne;
        return ligne;
    },
    this.getListe = ()=>{
        return liste_piece;
    },
    this.getListeNb = (nb)=>{
        return liste_piece[nb];
    },
    this.getTermine = ()=>{
        document.getElementById("aff_resultat").textContent = "GAME OVER";
        return termine;
    },
    this.getNiveau = ()=>{
        document.getElementById("aff_niveau").textContent = niveau;
        return niveau;
    },
    this.getNiveauScore = ()=>{
        if (niveau === 1)
            return 500;
        else if (niveau === 2)
            return 450;
        else if (niveau === 3)
            return 400;
        else if (niveau === 4)
            return 375;
        else if (niveau === 5)
            return 350;
        else if (niveau === 6)
            return 300;
        else if (niveau === 7)
            return 275;
        else if (niveau === 8)
            return 250;
        else if (niveau === 9)
            return 225;
        else if (niveau === 10)
            return 200;
        else if (niveau === 11)
            return 190;
        else if (niveau === 12)
            return 180;
        else if (niveau === 13)
            return 170;
        else if (niveau === 14)
            return 160;
        else if (niveau === 15)
            return 150;
    },
    this.getScore = ()=>{
        document.getElementById("aff_score").textContent = score;
        return score;
    },
    this.setNiveau = (score)=>{
        if (score < 500 )
            niveau = 1;
        else if (score > 499 && score < 1000 )
            niveau = 2;
        else if (score > 999 && score < 3000 )
            niveau = 3;
        else if (score > 2999 && score < 4000 )
            niveau = 4;
        else if (score > 3999 && score < 5000 )
            niveau = 5;
        else if (score > 4999 && score < 10000 )
            niveau = 6;
        else if (score > 9999 && score < 50000 )
            niveau = 7;
        else if (score > 49999 && score < 100000 )
            niveau = 8;
        else if (score > 99999 && score < 500000 )
            niveau = 9;
        else if (score > 499999 && score < 2000000 )
            niveau = 10;
        else if (score > 1999999 && score < 5000000 )
            niveau = 11;
        else if (score > 4999999 && score < 10000000 )
            niveau = 12;
        else if (score > 9999999 && score < 25000000 )
            niveau = 13;
        else if (score > 24999999 && score < 50000000 )
            niveau = 14;
        else 
            niveau = 15;
    },
    this.setScore = (sc)=>{
        score = sc;
    },
    this.setTermine = (t)=>{
        termine = t;
    },
    this.setListe = (g)=>{
        let random = 0;
        let prec = 0;
        for (let i=0; i<100000; i++){
            do{
                random = Math.floor(Math.random()*7)+1;
            }while(random === prec);
            liste_piece[i] = new Piece(random, g);
            prec = random;
        }
    },
    this.verifLignes = (grille)=>{
        let suite = 0;
        let tetris = 0;
        for(let i=0; i<grille.grille_y; i++){
            for(let j=0; j<grille.grille_x;j++){
                if(isNaN(grille.getNb(i,j)))
                    suite++;
            }
            if (suite === grille.grille_x){
                tetris++;ligne++;
                grille.change(i);
                grille.refresh();
                i--;
            }else{
                if(tetris === 4){
                    score += (1200)*niveau;
                }else if(tetris === 3){
                    score += (300)*niveau;
                }else if(tetris === 2){
                    score += (100)*niveau;
                }else if(tetris === 1){
                    score += (40)*niveau;
                }
                tetris = 0;
            }
            suite = 0;
        }
    },
    this.miniature = (pion)=>{
        if(pion !== undefined){
            if (pion.nb === 1){
                grille_miniature[5-2][3-1]="X";grille_miniature[5-2][3-2]="X";grille_miniature[5-2][3]="X";grille_miniature[5-2][3+1]="X";
            }else if(pion.nb === 2){
                grille_miniature[5-1][3]="C"; grille_miniature[5-1][3-1]="C";grille_miniature[5-2][3]="C";grille_miniature[5-3][3]="C";
            }else if(pion.nb === 3){
                grille_miniature[5-1][3]="V";grille_miniature[5-2][3]="V";grille_miniature[5-2][3-1]="V";grille_miniature[5-3][3-1]="V";
            }else if(pion.nb === 4){
                grille_miniature[5-2][3-1]="B";grille_miniature[5-2][3]="B";grille_miniature[5-3][3-1]="B";grille_miniature[5-3][3]="B";
            }else if(pion.nb === 5){
                grille_miniature[5-2][3-1]="T";grille_miniature[5-2][3-2]="T";grille_miniature[5-2][3]="T";grille_miniature[5-3][3-1]="T";
            }else if(pion.nb === 6){
                grille_miniature[5-2][3]="Z";grille_miniature[5-2][3-1]="Z";grille_miniature[5-3][3-1]="Z";grille_miniature[5-3][3-2]="Z";
            }else if(pion.nb === 7){
                grille_miniature[5-1][3-1]="J";grille_miniature[5-2][3-1]="J";grille_miniature[5-3][3-1]="J";grille_miniature[5-3][3]="J";
            }
        }
        
        let cell;
        for (i=1; i<6; i++){
            for (j=0; j<6; j++){
                cell = document.getElementById("cell_tetris_min"+i+j);
                if(grille_miniature[i][j] === "X")
                    cell.style.backgroundColor = "#008000";
                else if (grille_miniature[i][j] === "C")
                    cell.style.backgroundColor = "#144576";
                else if (grille_miniature[i][j] === "V")
                    cell.style.backgroundColor = "#F30000";
                else if (grille_miniature[i][j] === "B")
                    cell.style.backgroundColor = "#CEE812";
                else if (grille_miniature[i][j] === "T")
                    cell.style.backgroundColor = "#4B0082";
                else if (grille_miniature[i][j] === "Z")
                    cell.style.backgroundColor = "#C0C0C0";
                else if (grille_miniature[i][j] === "J")
                    cell.style.backgroundColor = "#B98B21";
                else
                    cell.style.backgroundColor = "#000000";
            }
        }
    },
    this.miniature_init = ()=>{
        let table = document.getElementById("tetris_min");
        for (i=1; i<6; i++){
            grille_miniature[i] = new Array();
            tr = table.insertRow(0);
            for (j=0; j<6; j++){
                grille_miniature[i][j] = j;
                td = tr.insertCell(0);
                td.setAttribute("class","cell_tetris_min");
                td.setAttribute("id","cell_tetris_min"+i+j);
            }
        }
    },
    this.miniature_reset = ()=>{
        for (i=1; i<6; i++){
            for (j=0; j<6; j++){
                grille_miniature[i][j] = j;
            }
        }
    },
    this.reset = ()=>{
        score = 0;
        niveau = 1;
        ligne = 0;
        termine = false;
        liste_piece = [];
    }
}

function main(g, j, booleen)
{
    if (booleen)
    {
        var e;
        var piece;
        var bas = document.getElementById('b_bas');
        var gauche = document.getElementById('b_gauche');
        var droit = document.getElementById('b_droit');
        var action = document.getElementById('b_action');
        var music = document.getElementById('audio_mus');
        music.play();
            
        let nb = 0;
        token(nb,g);
        function token(nb, g)
        {
            j.miniature_reset();
            j.verifLignes(g);
            j.getListeNb(nb).init()?(j.getListeNb(nb).ajoutGrille(),j.setNiveau(j.getScore()),piece = j.getListeNb(nb),e = new Ecouteurs(j.getListeNb(nb))):(j.getTermine(),j.getListeNb(nb).ajoutGrille(),j.setTermine(true),clearInterval(TmpGame),clearInterval(DownGame),document.getElementById('b_start').hidden = false);
            j.miniature(j.getListeNb(nb+1));
        }
        bas.onclick = function(nb){piece.down();return false;}
        gauche.onclick = function(nb){piece.left();return false;}
        droit.onclick = function(nb){piece.right();return false;}
        action.onclick = function(nb){piece.up();return false;}
            
        var DownGame = setInterval(function(){j.getListeNb(nb).down()}, j.getNiveauScore());
        var TmpGame = setInterval(function(){e.verifEvent(j.getListeNb(nb))?(j.getNiveau(),j.getCptLigne()):token(++nb,g);}, 5);
    }else{
        g.reset();
        g.refresh();
        j.reset();
        j.setListe(g);
        main(g, j, true);
    }
}


window.onload = function(){
    var g = new Grille(10,25);
    g.init();

    var j = new Jeu();
    j.setListe(g);
    j.miniature_init();

    var clic = document.getElementById('b_start');
    var txt = document.getElementById('aff_resultat')
    clic.onclick = function(){var self=this;setTimeout(function(){self.hidden=true;},0);txt.innerHTML='<p class="font-weight-bold" id="aff_resultat">Commandes : A:left - L:down - S:action - P:right</p>';main(g, j, false);return false;}
};