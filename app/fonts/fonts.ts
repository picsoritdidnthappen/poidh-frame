// fonts.js
import fs from 'fs'
import path from 'path'

export const fonts = [
    // Geist font family
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-Thin.ttf')),
        weight: 100,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-UltraLight.ttf')),
        weight: 200,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-Light.ttf')),
        weight: 300,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-Regular.ttf')),
        weight: 400,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-Medium.ttf')),
        weight: 500,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-SemiBold.ttf')),
        weight: 600,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-Bold.ttf')),
        weight: 700,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-Black.ttf')),
        weight: 800,
        style: 'normal',
    },
    {
        name: 'Geist',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'Geist-UltraBlack.ttf')),
        weight: 900,
        style: 'normal',
    },

    // GeistMono font family
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-Thin.ttf')),
        weight: 100,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-UltraLight.ttf')),
        weight: 200,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-Light.ttf')),
        weight: 300,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-Regular.ttf')),
        weight: 400,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-Medium.ttf')),
        weight: 500,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-SemiBold.ttf')),
        weight: 600,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-Bold.ttf')),
        weight: 700,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-Black.ttf')),
        weight: 800,
        style: 'normal',
    },
    {
        name: 'GeistMono',
        data: fs.readFileSync(path.join(__dirname, 'fonts', 'GeistMono-UltraBlack.ttf')),
        weight: 900,
        style: 'normal',
    },
];