const SongGroup = ({ group, songs, onSongClick }) => {
  return songs.map((song, index) => (
    <div
      key={song._id}
      className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
      onClick={() => onSongClick(songs, index)} // Pass group songs and clicked song index
    >
      <div className="relative mb-4">
        <div className="aspect-square rounded-md shadow-lg overflow-hidden">
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <h3 className="font-medium mb-2 truncate">{song.title}</h3>
      <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
    </div>
  ));
};

export default SongGroup;
