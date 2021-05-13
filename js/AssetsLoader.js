class AssetsLoader {
    static async load(assets) {
        const cache = {
            img: {},
            audio: {}
        };
        const imgPromises = assets.filter(asset => asset.type === "image").map(image => 
            new Promise(resolve => {
                const img = new Image();
                img.src = image.src;
                cache.img[image.key] = img;
                img.addEventListener("load", resolve);
            })
        );
        const audioPromises = assets.filter(asset => asset.type === "audio").map(audio =>
            new Promise(resolve => {
                const _audio = new Audio();
                _audio.src = audio.src;
                cache.audio[audio.key] = _audio;
                _audio.addEventListener("canplaythrough", resolve);
            })
        );
        await Promise.all([ ... imgPromises, ... audioPromises ]);
        return cache;
    }
};

export default AssetsLoader;