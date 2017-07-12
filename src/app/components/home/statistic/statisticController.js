export default class StatisticController{
    constructor(){
        this.data = [90, 10];
        this.labels = ["Progress", ""];
        this.options = {fill: true, 
            legend: { display: true },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    }
}