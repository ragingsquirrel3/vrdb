import { AppBar } from 'material-ui';

class PageLayout extends React.Component {
    render() {
        return (
            <div id="app">
                <AppBar title='VR_DB' />
                <div id='page-content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default PageLayout;