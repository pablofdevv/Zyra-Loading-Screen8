/**
 * ==========================================================================
 *        CENTRAL CONFIGURATION - LIQUID METAL BLOB SCREEN
 * ==========================================================================
 * Edit your server identity, official links, audio playlist, changelogs,
 * and component variables.
 */

window.ZyraConfig = {
    // 1. Server Branding Identity
    branding: {
        serverName: "ZYRA STORE",
        logoUrl: "assets/logo.png", // Reroute to your logo path if needed
        serverSubtitle: "LIQUID EDITION",
        claim: "ZYRA STORE",
        description: "The ultimate destination for premium FiveM roleplay resources. Experience optimized luxury gameplay."
    },

    // 2. Default Enabled / Disabled Components
    components: {
        enableSocials: true,             // Show official socials
        enableMusic: true,               // Show mini player
        enableBackgroundVideo: false,    // Show looping video background
        enableParticles: false           // Habilitar si se desea, pero desactivado por defecto en este estilo minimalista
    },

    // 3. Official Links
    socials: [
        { name: "Discord", url: "https://discord.gg/zyra" },
        { name: "Website", url: "https://zyrastore.com" },
        { name: "YouTube", url: "https://youtube.com/zyra" }
    ],

    // 4. Music Playlist
    music: {
        defaultVolume: 0.15,
        playlist: [
            { 
                title: "Shadows of the City", 
                artist: "Neon Syndicate", 
                url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
            },
            { 
                title: "Whispers of the Street", 
                artist: "Midnight Vibe", 
                url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
            },
            { 
                title: "Echoes of Roleplay", 
                artist: "Retro Wave", 
                url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
            }
        ]
    },

    // 5. Connection Status Log Phrases
    loading: {
        musicTipText: "PRESS SPACE TO PLAY/PAUSE MUSIC",
        phases: [
            { progress: 0, text: "Initializing database connection sequence..." },
            { progress: 20, text: "Downloading system files and interface assets..." },
            { progress: 50, text: "Compiling custom assets and vehicle handling configurations..." },
            { progress: 80, text: "Synchronizing player environment vectors with server host..." },
            { progress: 100, text: "Ready. Access granted." }
        ]
    },

    // 6. Global Accent Styling Theme (Bronze Gold)
    theme: {
        colorPrimary: "#030303",
        colorSecondary: "rgba(7, 7, 7, 0.45)",
        colorAccent: "#dfba5f",
        colorTextPrimary: "#fafafa",
        colorTextSecondary: "#a1a1aa",
        colorTextMuted: "#4e4e52",
        colorBorder: "rgba(255, 255, 255, 0.025)",
        colorBorderActive: "rgba(223, 186, 95, 0.35)",
        blurIntensity: "14px"
    },

    typography: {
        fontFamily: "'Inter', sans-serif",
        fontSizeBase: "16px"
    }
};
