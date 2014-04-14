module.exports = {
    index: function() {
        // body...
        this.res.render('index', {
            'time': new Date(),
        });
    },
    form: function() {
        // body...
        this.res.render('form', {
            'time': new Date(),
        });
    },
    menu: function() {
        // body...
        this.res.render('menu', {
            'time': new Date(),
        });
    },
    model: function() {
        // body...
        this.res.render('model', {
            'time': new Date(),
        });
    },
    view: function() {
        // body...
        this.res.render('view', {
            'time': new Date(),
        });
    },
};