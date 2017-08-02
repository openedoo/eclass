var EclassCollectionComponent = React.createClass({

    getInitialState: function() {
        return {
            eclassCollection: []
        }
    },

    getEclassCollection: function() {
        fetch('/api/v1/eclass')
            .then( (response) => {
                return response.json()
            })
            .then( (json) => {
                var arr = JSON.parse(json)
                this.setState({eclassCollection: arr})
            })
    },

    componentWillMount: function() {
        this.getEclassCollection()
    },

    render: function() {
        var { eclassCollection } = this.state;

        if (eclassCollection.length === 0) {
            return (
                <div><p>Eclass will show up here, make one!</p></div>
            )
        }

        return (
            <div>
                {eclassCollection.map(eclass =>
                    <li key={eclass.id}><a href={'/web/eclass/' + eclass.id}>{eclass.name}</a></li>
                )}
            </div>
        )
    }
});

ReactDOM.render(<EclassCollectionComponent />, document.querySelector('#root'))
