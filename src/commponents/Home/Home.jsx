import React from 'react';
import * as firebase from 'firebase';
import { setFirebase } from '../../fireStore/fireStore';
import { animateScroll as scroll } from 'react-scroll';
import './Home.css';
import Button from '../Button/button';


setFirebase();
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userComments: [],
            commentIndex: 0,
            myname: '',
            comment: '',
            isLogin: false
        };
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleClickFetchName = this.handleClickFetchName.bind(this);
        this.handleClickFetchComment = this.handleClickFetchComment.bind(this);
    }

    componentDidMount(){
        const db = firebase.firestore();
        const unsbscribe = db.collection('comments').orderBy('index').onSnapshot(( querySnapShot ) => {

            const _userComments = querySnapShot.docs.map(doc => {
                return{
                    commentId: doc.id,
                    ...doc.data()
                };
            })
            this.setState({
                userComments: _userComments,
                commentIndex: _userComments.length + 1
            });
        });
        return () => {
            unsbscribe('');
        };

    }

    scrollToBottom(){
        scroll.scrollToBottom();
    }
    handleChangeName( event ){
       this.setState({
           myname: event.target.value
       });
    };

    handleChangeComment( event ){
        this.setState({
            comment: event.target.value
        });
    };

    handleClickFetchName(){
        const name = this.state.myname.trim();
        if( name === '' ){
            alert('名前を入力してください。');

            return;
        } else if( name.length < 3 ) {
            alert('名前は３文字以上で入力してください。');

            return;
        } else {
            this.setState({
                isLogin: true
            });
        };
    };

    handleClickFetchComment = async () => {
        const name = this.state.myname;
        const comment = this.state.comment;
        const index = this.state.commentIndex;

        if( comment === ''){
            alert('コメントを入力してください。');
            return;
        }

        const db = firebase.firestore();
        const ref = await db.collection('comments').add({
            name: name,
            comment: comment,
            index: index
        });
        this.setState({
            comment: ''
        });

        if( this.state.commentIndex > 8 ){
        this.scrollToBottom();
        }
    }

    render(){
            if( this.state.isLogin === false ){
                return this.renderNameForm();
            }
            if( this.state.isLogin === true && this.state.userComments.length < 0 ){
                return this.renderLoading();
            }
            if( this.state.isLogin === true && this.state.userComments.length > 0 ){
                return this.renderCommentsArea();
            };
}

    renderNameForm() {
        return(
            <div className="name_form">
                <div>
                    <div>
                        <label htmlFor="setName">名前を入力してください</label> 
                    </div>
                    <div>
                        <input type="text" id="setName" name="name" value={ this.state.myname } onChange={ this.handleChangeName }></input>
                    </div>
                </div>
                <div className="button_container">
                    <Button onClickHandler={ this.handleClickFetchName }>完了</Button>
                </div>
            </div>
        );
    }

    renderLoading() {
        return(
            <div>
                <p>コメントを取得しています...</p>
            </div>
        );
    };

    renderCommentsArea() {
        const name = this.state.myname;
        const comments = this.state.userComments.map(comment => {
            return(
                <li key={comment.commentId }>
                    <div className="comment_container">
                        <div>
                            <p>{ comment.name }</p>
                        </div>
                        <div className="comment">
                            <p>{ comment.comment }</p>
                        </div>
                    </div>
                </li>
            )
        })

        return(
            <div className="main">
                <div className="comment_list"> 
                    <ul className="list_style">{ comments }</ul>
                </div>
                <div className="comment_form">
                    <h1>{ name }</h1>
                    <label htmlFor="setComment">コメント：</label>
                    <input type="text" id="setComment" value={ this.state.comment } onChange={ this.handleChangeComment }></input>
                    <Button onClickHandler={ this.handleClickFetchComment }>送信</Button>
                </div>
            </div>
        )
    }
}

export default Home;
