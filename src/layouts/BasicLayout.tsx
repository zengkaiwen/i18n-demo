import * as React from 'react';
import { ReactPortal } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { styled } from "styled-components";
import { recoilLocale } from '../models';
import { SupportedLocale } from '../locales';
import { Trans } from '@lingui/macro';

const Wrapper = styled.div`
    header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 10px;
        height: 40px;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        span {
            font-size: 14px;
            font-weight: 600;
        }
        ul {
            display: flex;
            flex: 1;
            gap: 10px;
        }
    }
    main {
        margin: 0 auto;
        padding-top: 20px;
        max-width: 1000px;
    }
`

const BasicLayout: React.FC<ReactPortal> = ({ children }) => {
    const setLocale = useSetRecoilState(recoilLocale)

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback((e) => {
        console.log(e.target.value)
        setLocale(e.target.value as SupportedLocale)
    }, [setLocale]);

    return (
        <Wrapper>
            <header>
                <ul className="left">
                    <li>
                        <Link to="/page1" ><Trans>Page1</Trans></Link>
                    </li>
                    <li>
                        <Link to="/page2" ><Trans>Page2</Trans></Link>
                    </li>
                </ul>
                <div className="right">
                    <span><Trans>Language: </Trans></span>
                    <select onChange={handleChange}>
                        <option value="en">English</option>
                        <option value="zh">简体中文</option>
                    </select>
                </div>
            </header>
            <main>{children}</main>
        </Wrapper>
    )
}

export default BasicLayout;