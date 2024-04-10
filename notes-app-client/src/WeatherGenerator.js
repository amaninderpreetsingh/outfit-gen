export default class {
    willRain = (weather) => {
       return weather.precipProbability > 10 
    }
    wontRain = (weather) => {
        return weather.precipProbability === 0
    }
    isCold = (weather) => {
        return weather.temperature < 60
    }
    isHot = (weather) => {
        return weather.temperature > 80
    }
    isWeekday = (weather) => {
        const d = new Date(weather.time).getDay()
        return d > 0 && d < 6
    }

    getShoes = (weather) => {
        if (this.willRain(weather) || this.isCold(weather)) {
            return ["Boots", "Shoes", "Sandals"]
        } else if (this.wontRain(weather) && this.isHot(weather)) {
            return ["Sandals", "Shoes", "Boots"]
        } else {
            return ["Shoes", "Sandals", "Boots"]
        }
    }
    getPants = (weather) => {
        if (this.isWeekday(weather)) {
            return ["Pants", "Shorts"]
        } else if (this.willRain(weather) || this.isCold(weather)) {
            return ["Pants", "Shorts"]
        } else if (this.wontRain(weather) && this.isHot(weather)) {
            return ["Shorts", "Pants"]
        } else {
            return ["Pants", "Shorts"]
        }
    }
    getJacket = (weather) => {
        if (this.willRain(weather) || this.isCold(weather)) {
            return ["Jacket", null]
        } else if (this.wontRain(weather) && !this.isCold(weather)) {
            return [null, "Jacket"]
        } else {
            return ["Jacket", null]
        }
    }
    getShirt = (weather) => {
        if (this.willRain(weather) || this.isCold(weather)) {
            return ["LongSleeve", "ShortSleeve", "TankTop"]
        } else if (this.wontRain(weather) && this.isHot(weather) && !this.isWeekday(weather)) {
            return ["TankTop", "ShortSleeve", "LongSleeve"]
        } else {
            return ["ShortSleeve", "LongSleeve", "TankTop"]
        }
    }

    getClothingTypes = (weather) => {
        // if (weather === null) {
        //     return {shoeTypes: ["Shoes", "Sandals", "Boots"], pantTypes: ["Pants", "Shorts"], jacketTypes: ["Jacket", null], shirtTypes: ["ShortSleeve", "LongSleeve", "TankTop"]}
        // }
        const shoeTypes = this.getShoes(weather)
        const pantTypes = this.getPants(weather)
        const jacketTypes = this.getJacket(weather)
        const shirtTypes = this.getShirt(weather)
        return {shoeTypes, pantTypes, jacketTypes, shirtTypes}
    }
}