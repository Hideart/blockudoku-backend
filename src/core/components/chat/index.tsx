import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';
import { SendIcon, HideIcon } from '../icon';

class ChatLayout extends Component<IOwnProps> {

    onCloseHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        const { onClose } = this.props;
        onClose && onClose();
    }

    render() {
        const {className, isOpened, ...others} = this.props;
        const chatModifier = isOpened ? `chat_opened` : '';
        return (
            <section
                className={`${className} chat ${chatModifier}`}
                {...others}
            >
                <div className='chat__heading'>
                    <button className='chat__hide' onClick={this.onCloseHandler}>{HideIcon()}</button>
                    <div className='chat__user'>
                        <div className='chat__user-avatar'>
                            <img src='' alt=''/>
                        </div>
                        <div className='chat__user-info'>
                            <p className='chat__user-name'>John Doe</p>
                            <p className='chat__user-status'>Online</p>
                        </div>
                    </div>
                </div>
                <div className='chat__main'>
                    <div className='chat__content'>
                        <p className='chat__date'>Yesterday</p>
                        <section className='chat__item'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                        <p className='chat__date'>Today</p>
                        <section className='chat__item chat__item_self'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                        <p className='chat__date'>Yesterday</p>
                        <section className='chat__item'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                        <p className='chat__date'>Today</p>
                        <section className='chat__item chat__item_self'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                        <p className='chat__date'>Yesterday</p>
                        <section className='chat__item'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                        <p className='chat__date'>Today</p>
                        <section className='chat__item chat__item_self'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                        <p className='chat__date'>Yesterday</p>
                        <section className='chat__item'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                        <p className='chat__date'>Today</p>
                        <section className='chat__item chat__item_self'>
                            <img className='chat__item-avatar' src='' alt=''/>
                            <p className='chat__item-content'>
                                {/* tslint:disable-next-line: max-line-length */}
                                I'm sorry, I don't have the answer to that question. May I put you on hold for a few minutes?
                                <span className='chat__item-time'>18:54</span>
                            </p>
                        </section>
                    </div>
                    <form className='chat__controls'>
                        <textarea className='chat__textarea' name='textarea' placeholder='Type message' />
                        <button className='chat__submit' type='submit'>{SendIcon()}</button>
                    </form>
                </div>
            </section>
        );
    }
  }

export const Chat = styledComponents(ChatLayout)`${styles}`;
