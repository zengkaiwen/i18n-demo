import * as React from 'react'
import { Trans } from '@lingui/macro'
import { styled } from 'styled-components';
// import { useLingui } from '@lingui/react';

const Wrapper = styled.div`
    h2 {
        margin-bottom: 20px;
        font-size: 30px;
    }
    table {
        margin: 20px 0;
        width: 100%;
        overflow: hidden;
        thead {
            margin: 10px 0;
        }
        th, td {
            text-align: left;
        }
        tr {
            display: flex;
            flex-flow: row nowrap;
            th:nth-child(1),
            td:nth-child(1) {
                flex: 1 0 200px;
            }
            th:nth-child(2),
            td:nth-child(2) {
                flex: 1 0 400px;
            }
            th:nth-child(3),
            td:nth-child(3) {
                flex: 1 0 200px;
            }
            th:nth-child(4),
            td:nth-child(4) {
                flex: 1 0 200px;
            }
        }
        tbody tr {
            margin: 20px 0;
        }
    }
    .loading, .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }
`

interface KeyName {
    key: string;
    name: React.ReactNode;
}

interface DataItem {
    repository: string;
    link: string;
    language: string;
    star: number;
    about: string;
}

const ITEM_LIST: KeyName[] = [
    { key: '1', name: <Trans>Repositories</Trans> },
    { key: '2', name: <Trans>Link</Trans> },
    { key: '3', name: <Trans>Language</Trans> },
    { key: '4', name: <Trans>Star</Trans> },
]

const DATA_LIST: DataItem[] = [
    {
        repository: 'OpenBMB / ChatDev',
        link: 'https://github.com/OpenBMB/ChatDev',
        about: 'Create Customized Software using Natural Language Idea (through Multi-Agent Collaboration)',
        language: 'Python',
        star: 2505,
    },
    {
        repository: 'raysan5 / raylib',
        link: 'https://github.com/raysan5/raylib',
        about: 'A simple and easy-to-use library to enjoy videogames programming',
        language: 'C',
        star: 14698,
    },
    {
        repository: 'graphdeco-inria / gaussian-splatting',
        link: 'https://github.com/graphdeco-inria/gaussian-splatting',
        about: 'Original reference implementation of "3D Gaussian Splatting for Real-Time Radiance Field Rendering"',
        language: 'Python',
        star: 2805,
    },
]

function waitTime(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const Page2 = () => {
    // useLingui()

    const [loading, setLoading] = React.useState<boolean>(false);
    const [dataList, setDataList] = React.useState<DataItem[]>([]);

    const memoLoading = React.useMemo(() => {
        if (loading) {
            return <div className="loading"><span><Trans>Loading...</Trans></span></div>
        }
        return null;
    }, [loading]);

    const memoEmpty = React.useMemo(() => {
        if (!loading && dataList.length === 0) {
            return <div className="empty"><span><Trans>No Data</Trans></span></div>
        }
        return null
    }, [dataList, loading]);

    const handleLoad = React.useCallback(async () => {
        setLoading(true);
        setDataList([]);
        await waitTime(2_000)
        setLoading(false);
        const rand = Math.random();
        if (rand > 0.5) {
            setDataList(DATA_LIST)
        }
    }, []);

    React.useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <Wrapper>
            <h2><Trans>Page2</Trans></h2>
            <button onClick={handleLoad}><Trans>Load Data</Trans></button>
            <table>
                <thead>
                    <tr>
                    {
                        ITEM_LIST.map(item => <th key={item.key}>{item.name}</th>)
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList.map((item) => (
                            <tr key={item.repository}>
                                <td>{item.repository}</td>
                                <td>{item.link}</td>
                                <td>{item.language}</td>
                                <td>{item.star}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {memoLoading}
            {memoEmpty}
        </Wrapper>
    )
}

export default Page2