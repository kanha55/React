import React from 'react';

import { connect } from 'react-redux';

import './App.css';

import { LoginPage } from "./pages/login/login.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import Aux from "./components/hoc/Aux";
import Page from "./pages/page/page.component";

//import WorkOrderList from "./components/work-order/list/work-order-list.component";

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        let code = <LoginPage />;
        if (this.props.currentUser) {
            code = <Page />;
        }
        return (
            <Aux>
                {code}
            </Aux>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);