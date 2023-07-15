class Musician{
    constructor(name, instrument){
    this.name = name
    this.instrument = instrument
 }
 describe() {
    return `${this.name} plays the ${this.instrument}.`
 }
}

class Band{
    constructor(name){
        this.name = name
        this.musicians = []
    }
 addMusician(musician){
    if (musician instanceof Musician){
        this.musicians.push(musician)
    } else{
        throw new Error(`${musician} is not valid.`)
    }
 } //ensures that the input is an instance of a musician
 describe(){
    return `${this.name} has ${this.musicians.length} members in the band.`
 }
}
//Musician and Band above, are used to represent data. The menus below are used to represent a part of the page.
class Menu{
    constructor(){
        this.bands = []
        this.selectedBand = null
    }
    start(){
        let selection = this.showMainMenuOptions()
        while (selection !=0){
            switch(selection){
              case '1': 
                this.createBand();
                break;
              case '2':
                this.viewBand();
                break;
              case '3':
                this.deleteBand();
                break;
              case '4':
                this.displayBands();
                break;
              default: 
                selection = 0;
            //if user input is anything else, it defaults to 0, which will exit from the menu
            }
            selection = this.showMainMenuOptions()
        }  //keeps the menu looping
        alert("Thank you, come again!")
    }
    showMainMenuOptions(){
        return prompt(`
        0) Exit
        1) Create new band
        2) View band
        3) Delete band
        4) Display all bands
        `)
    }//this method shows all the main menu options

    showBandMenuOptions(bandInfo){
        return prompt (`
        0) Back
        1) Add musician
        2) Delete musician
        -------------------
        ${bandInfo}
        `)
    }//this menu shows all the options when viewing the selected band


    displayBands(){
        let bandString = '';
        for(let i=0; i<this.bands.length; i++){
            bandString += i + ' - ' + this.bands[i].name + '\n';
        }//this creates the bandString, will show an index with each band name
        alert(bandString)
    }
    createBand(){
        let name = prompt("Enter name for new band.")
        this.bands.push(new Band(name))
    }//pushes the band name to the band array
    viewBand(){
        let index = prompt("Enter the index of the band you wish to view.")
        if (index > -1 && index<this.bands.length){ //validates user input
            this.selectedBand = this.bands[index]
            let description = 'Band name: ' + this.selectedBand.name + '\n'

        for(let i=0; i<this.selectedBand.musicians.length; i++){
            description += i + ' - ' + this.selectedBand.musicians[i].name + ' - ' + this.selectedBand.musicians[i].instrument + '\n'
        } //adds description of musicians to the band 
        let selection = this.showBandMenuOptions(description)
        switch(selection){
            case '1':
                this.createMusician();
                break;
            case '2':
                this.deleteMusician();
            }
        //creates a sub-menu within view band option
        }
    }
    deleteBand(){
        let index = prompt('Enter the index of the band you wish to delete.')
        if (index >-1 && index < this.bands.length){
            this.bands.splice(index,1)
        }   //splice will delete the band at the index given with user input
    }
    createMusician(){
        let name = prompt('Enter new musician name.')
        let instrument = prompt('Enter instrument musician plays.')
        this.selectedBand.musicians.push(new Musician(name, instrument))
    } //will push the new musician to the selected band

    deleteMusician() {
        let index = prompt('Enter the index of the musician that you wish to delete: ');
        if (index > -1 && index < this.selectedBand.musicians.length) { 
            this.selectedBand.musicians.splice(index,1);
        }
    }//splice will delete the musician at the index provided by the user input

}

let menu = new Menu();
menu.start()
//creates instance of menu to run code