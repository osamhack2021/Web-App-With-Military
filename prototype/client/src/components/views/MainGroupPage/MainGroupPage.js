import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button } from '@mui/material';
import Axios from "axios";

export default function MainGroupPage() {
    const user = useSelector((state) => state.user);
    const groups = 
    <Box>
        {user.userData !== undefined &&
            user.userData.groupList.map((group, index) => (
            <Box key="index">
                <a href={`/groups/${group._id}`}>{group.groupName}</a>
            </Box>
        ))}
    </Box>

    return (
        <>
            <Button
                component="a"
                href="/group/create"
                variant="contained"
                color="secondary"
            >
                스터디 그룹 추가
            </Button>
            {groups}
        </>
    );
}