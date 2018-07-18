let vue = new Vue({
    el: '#app',
    data: {
        // which tab is showing?
        counter: 0,
        tabs: [
            'showHighScore', 
            'showInformation', 
            'showDeveloper'
        ],
        currentTab: 'showHighScore'
    },
    methods: {
        // changes tab showing
        toggleView ( index ) {
            this.counter = index
            this.currentTab = this.tabs[this.counter]
        }
    }
})