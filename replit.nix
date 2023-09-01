{ pkgs }: {
deps = [
pkgs.nodejs-16_x
pkgs.libuuid
];
env = {
LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];
};
}
