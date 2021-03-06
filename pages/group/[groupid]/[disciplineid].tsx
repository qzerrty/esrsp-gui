import Head from 'next/head';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useApp } from '../../_app';
import MainContainer from '../../../src/containers/MainContainer';
import GroupContainer from '../../../src/containers/GroupContainer';

import { jwtfetch } from '../../../src/utils';

const Group = () => {
	const router = useRouter();
	const { groupid, disciplineid } = router.query;

	const { user } = useApp();

	const [groupData, setGroupData] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			const res = await jwtfetch(`/api/group/${groupid}/${disciplineid}`);
			setGroupData(await res.json());
		}

		if (user.loggedin && !groupData) {
			fetchData();
		}
	});

	return <>
		<Head>
			{
				groupData ?
					<title>{ groupData.name } Группа - { groupData.discipline } - ESRSP</title> :
					<title>Группа - ESRSP</title>
			}
		</Head>
		<MainContainer>
			{
				groupData &&
				<GroupContainer groupData={ groupData }/>
			}
		</MainContainer>
	</>;
}

export default Group;