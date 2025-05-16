# The CSS Side of the Capstone Project

## How the dark and light theme works:
``` CSS
:root{
    --background-color: #ffffff;;
    --text-color: #ff0a0a;;
   --button-bg-color:#ff0606;
    --button-text-color:#ffffff;
    --border-color:#ff0606;
    --color:#ff0a0a;
    --card-bg: #ffffff;
    --input-bg-color: rgb(255, 255, 255);
    --card-shadow: rgba(0,0,0,0.1);
    --player-card-bg-color:#ffffff;
    --p-color:red;
    --player-card-border-color:red solid 1px;
    --player-card-border-shadow-color:rgb(230, 35, 35) ;
    --input-text: black;
}

.dark-Theme{
    background-color: #000000;
    color: #00ff11;
    --button-bg-color:#15ff00;
    --button-text-color:#000000;
    --border-color: #00ff11;
    --h1-color:#00ff11;
    --input-bg-color: rgb(39, 38, 38);
    --player-card-bg-color:rgb(43, 42, 42);
    --p-color:white;
    --player-card-border-color:rgb(32, 116, 32) solid 1px;
    --player-card-border-shadow-color:rgb(48, 106, 48);
    --input-text:white;
}
```

The :root is responsible for containing all the original Colors that make up the base of the HTML page.

The .dark-Theme is the oposite of the root, and is responsible for containing all the oposite colors.

## The Main style for the HTML pages Container and Boxes
```CSS
*{
    text-align: center;
    font-weight: bold;
}
body{
    color: #ff0606;
    
}
.container{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows:repeat(3, 1fr) ;
    padding: 10px;
    gap: 100px;
    margin-right: 10px;
}
.container > div {
    background-color: #f1f1f1;
    border: 1px solid black;
    padding: 10px;
    font-size: 30px;
    text-align: center;
}
```
The * is responsible for affecting everything within the HTML Page

The Container covers all that is seen in the list of players.

## The Player Card Stylizing and other parts of the page

``` CSS

p{
    margin: 10px;
    margin-bottom: 10px;
    color: var(--p-color);
}

.player-card{
    background-color: var(--player-card-bg-color);
  border: var(--player-card-border-color);
  border-radius: 12px;
  width: 300px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px var(--player-card-border-shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
}

``` 

The .player-card is responsible for the color and style you see in the Body and Player cards obviously.

The P tag is responsible for styling all the other miscellaneous parts of the page such as the Recent Searches Bar.

## Flag Image and the Result Container

```CSS 
.flag-img{
    width:150px;
    height:100px;
    object-fit: cover;
    border: #000000 1px solid;
}

#resultsContainer{
    display: flex;
    justify-content: center;
    gap: 35px;
    flex-wrap: wrap;
}
```

The .flag-img tag is responsible for the flag not covring the entire box and keeping it contained.

The #resultsContainer is responsible for the Player Cards being as Fancy and organized as they are.

## The Rest of the CSS:

```CSS 
button{
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    /* background-color: rgb(234, 48, 48); */
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    border: none;
}
input{
    padding: 10px;
    width: 200px;
    text-align: left;
    border-radius: 10px;
    border-color: var(--border-color);
    background-color: var(--input-bg-color);
    color: var(--input-text);
}
```
This Covers the rest of the Style in the Page.

The Input for the Search Button and the Button for the button Styling.