import React, {useState} from 'react';

// Volume Consistency State

const [isMuted, setIsMuted] = useState < boolean > (true);
const [currentVolume, setCurrentVolume] = useState < number > (1);