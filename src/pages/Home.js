import React from 'react';

export default function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '2%' }}>
            <h1 style={{ fontFamily: "'Dancing Script', cursive" }}>Welcome to AlgoVisualizer</h1>
            <p style={{ fontFamily: "'Annie Use Your Telescope', cursive" }}>Visualize sorting and searching algorithms in real-time!</p>
            
            <section style={{ marginTop: '3%' }}>
                <h2 style={{ fontFamily: "'Dancing Script', cursive" }}>Introduction</h2>
                <p style={{ fontFamily: "'Annie Use Your Telescope', cursive" }}>
                    AlgoVisualizer is an interactive tool designed to help you understand how various algorithms work. 
                    Whether you are a student, a teacher, or just someone interested in algorithms, this tool will provide 
                    you with a visual representation of how different sorting and searching algorithms operate.
                </p>
            </section>

            <section style={{ marginTop: '3%' }}>
                <h2 style={{ fontFamily: "'Dancing Script', cursive" }}>Features</h2>
                <ul style={{ listStyleType: 'none', padding: 0, fontFamily: "'Annie Use Your Telescope', cursive" }}>
                    <li>✔️ Real-time visualization of algorithms</li>
                    <li>✔️ Step-by-step explanation</li>
                    <li>✔️ Interactive controls</li>
                    <li>✔️ Multiple algorithms to choose from</li>
                    <li>✔️ Easy to use interface</li>
                </ul>
            </section>

            <section style={{ marginTop: '3%' }}>
                <h2 style={{ fontFamily: "'Dancing Script', cursive" }}>Get Started</h2>
                <p style={{ fontFamily: "'Annie Use Your Telescope', cursive" }}>
                    Ready to dive into the world of algorithms? Click the button below to start visualizing!
                </p>
                <button style={{ padding: '10px 20px', fontSize: '1em', fontFamily: "'Annie Use Your Telescope', cursive", cursor: 'pointer' }}>
                    Start Visualizing
                </button>
            </section>
        </div>
    );
}