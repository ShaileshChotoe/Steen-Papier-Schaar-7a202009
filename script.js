
class Player 
{

    constructor(name)
    {        
        this.name = name;
        this.points = 0;
    }

    update()
    {
        
    }

    getName()
    {
        return this.name;
    }

    setName(name)
    {
        this.name = name;
    }

    setProp(propName)
    {
        this.prop = new Prop(propName);
    }

    addPoints()
    {
        this.points = this.points + 1;
    }

    getPoints()
    {
        return this.points;
    }

    getProp()
    {
        return this.prop;
    }
    
    removeProp()
    {
        this.prop = null;
    }

    getPropName()
    {
        return this.getProp().getName();
    }
    
    draw()
    {
        
    }

}

class UI
{

    constructor(playerManager)
    {
        this.playerManger = playerManager;
        this.player1_points;
        this.player2_points;
        this.currentPlayer;
    }

    update()
    {
        this.player1_points = this.playerManger.player1.getPoints();
        this.player2_points = this.playerManger.player2.getPoints();
        this.currentPlayer = this.playerManger.getCurrentPlayer().getName();
    }

    draw()
    {
        document.querySelectorAll(".score")[0].innerText = "P1: " + this.player1_points; 
        document.querySelectorAll(".score")[1].innerText = "P2: " + this.player2_points; 
        document.querySelector("h3").innerText = this.currentPlayer + " is aan de beurt";
    }
}

class GameManager
{
    
    constructor()
    {
        this.playerManager = new PlayerManager();
        this.ui = new UI(this.playerManager);
    }

    update()
    {
       this.playerManager.update(); 
       this.ui.update();
    }


    draw()
    {
        this.ui.draw();
    }
}

class Application
{

    constructor()
    {
        this.gameManager = new GameManager();
    }

    update()
    {
        this.gameManager.update();
        this.gameManager.draw();
    }
}

class PlayerManager
{

    constructor()
    {
        this.player1 = new Player('Shailesh');
        this.player2 = new Player('Noob');
        this.currentPlayer = this.player1;
        this.inputManager = inputManager;
    }

    update()
    {

        if(this.playerHasChosen(this.player1))
        {       
            this.playerHasChosen(this.player2);
            this.checkWinner();
            this.resetPlayersChoices();
        }

        this.setCurrentPlayer();

    }

    setCurrentPlayer()
    {
        if((!this.player1.getProp()) && (!this.player2.getProp()))
        {
            this.currentPlayer = this.player1;
        }
        else
        {
            this.currentPlayer = this.player2;
        }
    }

    playerHasChosen(player)
    {

        if(!this.hasUserChosen())
        {
            return false;
        }

        if(!player.getProp())
        {
            this.attachPropToPlayer(player, this.inputManager.getKey());
            return false;
        }
        
        return true;
    }

    hasUserChosen()
    {
        if(!inputManager.getKey())
        {
            return false;
        }
        return true;
    }

    attachPropToPlayer(player, propName)
    {
        player.setProp(propName);
    }

    checkWinner()
    {
        if(this.getWinner())
        {
            this.getWinner().addPoints();
            console.log(this.getWinner().getName() + " won met " + this.getWinner().getPropName());
        }
        else
        {
            console.log('gelijkspel!');
        }
    }

    getWinner()
    {
        if(this.player1.getPropName() == this.player2.getProp().getEnemy())
        {
            return this.player1;
        }
        else if(this.player2.getPropName() == this.player1.getProp().getEnemy())
        {
            return this.player2;
        }
        
        return false;
    }

    getCurrentPlayer()
    {
        return this.currentPlayer;
    }

    resetPlayersChoices()
    {
        this.player1.removeProp();
        this.player2.removeProp();
    }

}

class InputManager
{

    constructor()
    {
        this.key;
    }

    setKey(key)
    {
        this.key = key;
    }

    getKey()
    {
        return this.key;
    }

}

class Prop
{

    constructor(name)
    {
        this.name = name;
        this.setEnemy();
    }

    setName(name)
    {
        this.name = name;
    }

    getName()
    {
        return this.name;
    }

    update()
    {

    }

    setEnemy()
    {
        switch (this.name) 
        {
            case "Steen":
                this.enemy = "Papier";
                break;
            case "Papier":
                this.enemy = "Schaar";
                break;
            case "Schaar":
                this.enemy = "Steen"; 
                break;
            default:
                break;
        }
    }

    getEnemy()
    {
        return this.enemy;
    }
}

let inputManager = new InputManager();
let application = new Application();
application.update();
