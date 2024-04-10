const tinycolor = require("tinycolor2");

export default class {
    getRedComponent = (color) => {
        return parseInt(color.substring(1,3), 16)
    }
    getGreenComponent = (color) => {
        return parseInt(color.substring(3,5), 16)
    }
    getBlueComponent = (color) => {
        return parseInt(color.substring(5,7), 16)
    }

    getComplement = (color) => {
        return tinycolor(color).complement().toHexString()
    }

    sortClothing = (color, articles) => {
        var newArticles = []
        while (articles.length > 0) {
            const bestColor = this.getCloseColor(color, articles)
            articles = articles.filter(a => a !== bestColor)
            newArticles.push(bestColor)
        }
        return newArticles
    }

    colorDifference = (c1, c2) => {
        const r = this.getRedComponent(c1)
        const g = this.getGreenComponent(c1)
        const b = this.getBlueComponent(c1)
        const newr = this.getRedComponent(c2)
        const newg = this.getGreenComponent(c2)
        const newb = this.getBlueComponent(c2)
        const diffr = Math.abs(newr-r)
        const diffg = Math.abs(newg-g)
        const diffb = Math.abs(newb-b)
        return diffr + diffg + diffb
    }

    getCloseColor = (color, articles) => {
        var bestClothing = articles[0]
        var minDiff = 10000
        articles.forEach(c => {
            const newDiff = this.colorDifference(color, c.color)
            if (newDiff < minDiff) {
                minDiff = newDiff
                bestClothing = c
            }
        });
        return bestClothing
    }
}