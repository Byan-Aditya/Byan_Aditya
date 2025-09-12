// Chess by Copilot: full rules, multiplayer & computer + undo + highlight skak + dropdown mode

const PIECES = {
  'wk': '<img src="images/catur/king-white.png" class="piece-img">',
  'wq': '<img src="images/catur/queen-white.png" class="piece-img">',
  'wr': '<img src="images/catur/rook-white.png" class="piece-img">',
  'wb': '<img src="images/catur/bishop-white.png" class="piece-img">',
  'wn': '<img src="images/catur/knight-white.png" class="piece-img">',
  'wp': '<img src="images/catur/pawn-white.png" class="piece-img">',
  'bk': '<img src="images/catur/king-black.png" class="piece-img">',
  'bq': '<img src="images/catur/queen-black.png" class="piece-img">',
  'br': '<img src="images/catur/rook-black.png" class="piece-img">',
  'bb': '<img src="images/catur/bishop-black.png" class="piece-img">',
  'bn': '<img src="images/catur/knight-black.png" class="piece-img">',
  'bp': '<img src="images/catur/pawn-black.png" class="piece-img">',
  '': ''
};

let board, selected, turn, highlights, animating, mode;
let hasMoved, enPassant, halfmoveClock, positionHistory;
let moveHistory = [];

function initBoard() {
  hasMoved = {
    'wk': false, 'bk': false,
    'wrA': false, 'wrH': false,
    'brA': false, 'brH': false
  };
  enPassant = null;
  halfmoveClock = 0;
  positionHistory = {};
  return [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
  ];
}

function resetGame(newMode) {
  board = initBoard();
  selected = null;
  turn = 'w';
  highlights = [];
  animating = false;
  mode = newMode;
  Swal.close();
  moveHistory = [];
  renderBoard();
  if (mode === 'computer' && turn === 'b') setTimeout(computerMove, 400);
}

function renderBoard() {
  const chessboard = document.getElementById('chessboard');
  chessboard.innerHTML = '';
  let kingRow = -1, kingCol = -1;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c] === turn + 'k') { kingRow = r; kingCol = c; }
  let isSkak = (kingRow !== -1 && isSquareAttacked(kingRow, kingCol, turn));
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement('div');
      sq.className = 'square ' + ((r + c) % 2 == 0 ? 'white' : 'black');
      sq.dataset.row = r;
      sq.dataset.col = c;
      sq.innerHTML = PIECES[board[r][c]];
      if (selected && selected[0] === r && selected[1] === c) {
        sq.classList.add('selected');
      }
      if (highlights.some(h => h[0] === r && h[1] === c)) {
        sq.classList.add('highlight');
      }
      if (isSkak && r === kingRow && c === kingCol) {
        sq.classList.add('king-skak');
      }
      sq.onclick = () => handleClick(r, c);
      chessboard.appendChild(sq);
    }
  }
  let statusText = '';
  if (mode === 'computer') {
    statusText = (turn === 'w' ? 'Giliran Putih (Anda)' : 'Giliran Hitam (Komputer)');
  } else {
    statusText = (turn === 'w' ? 'Giliran Putih' : 'Giliran Hitam');
  }
  if (isSkak) statusText += ' - SKAK!';
  document.getElementById('status').innerText = statusText;
}

function getValidMoves(row, col, ignoreLegal = false) {
  let piece = board[row][col];
  if (!piece) return [];
  let color = piece[0];
  let type = piece[1];
  let moves = [];
  if (type === 'p') moves = pawnMoves(row, col, color);
  if (type === 'n') moves = knightMoves(row, col, color);
  if (type === 'b') moves = bishopMoves(row, col, color);
  if (type === 'r') moves = rookMoves(row, col, color);
  if (type === 'q') moves = queenMoves(row, col, color);
  if (type === 'k') moves = kingMoves(row, col, color);
  if (ignoreLegal) return moves;
  let legal = [];
  for (let [mr, mc] of moves) {
    let backup = board[mr][mc];
    let old = board[row][col];
    board[mr][mc] = old;
    board[row][col] = '';
    let kingPos = null;
    for (let r2 = 0; r2 < 8; r2++)
      for (let c2 = 0; c2 < 8; c2++)
        if (board[r2][c2] === color + 'k') kingPos = [r2, c2];
    if (old[1] === 'k') kingPos = [mr, mc];
    let attacked = isSquareAttacked(kingPos[0], kingPos[1], color);
    board[row][col] = old;
    board[mr][mc] = backup;
    if (!attacked) legal.push([mr, mc]);
  }
  return legal;
}

function pawnMoves(row, col, color) {
  let moves = [];
  let dir = color === 'w' ? -1 : 1;
  let startRow = color === 'w' ? 6 : 1;
  if (board[row+dir] && board[row+dir][col] === '') {
    moves.push([row+dir, col]);
    if (row === startRow && board[row+2*dir][col] === '') {
      moves.push([row+2*dir, col]);
    }
  }
  for (let dc of [-1, 1]) {
    let nr = row+dir, nc = col+dc;
    if (board[nr] && board[nr][nc] && board[nr][nc] !== '' && board[nr][nc][0] !== color) {
      moves.push([nr, nc]);
    }
  }
  if (enPassant) {
    let epRow = enPassant[0], epCol = enPassant[1];
    if (Math.abs(epCol - col) === 1 && epRow === row + dir) {
      if (row === (color === 'w' ? 3 : 4)) moves.push([epRow, epCol]);
    }
  }
  return moves;
}
function knightMoves(row, col, color) {
  let moves = [];
  let dirs = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];
  for (let [dr, dc] of dirs) {
    let nr = row + dr, nc = col + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
      if (board[nr][nc] === '' || board[nr][nc][0] !== color) {
        moves.push([nr, nc]);
      }
    }
  }
  return moves;
}
function slidingMoves(row, col, color, directions, maxStep=8) {
  let moves = [];
  for (let [dr, dc] of directions) {
    for (let step = 1; step <= maxStep; step++) {
      let nr = row + dr*step, nc = col + dc*step;
      if (nr < 0 || nr > 7 || nc < 0 || nc > 7) break;
      if (board[nr][nc] === '') {
        moves.push([nr, nc]);
      } else if (board[nr][nc][0] !== color) {
        moves.push([nr, nc]);
        break;
      } else {
        break;
      }
    }
  }
  return moves;
}
function bishopMoves(row, col, color) {
  return slidingMoves(row, col, color, [[1,1],[1,-1],[-1,1],[-1,-1]]);
}
function rookMoves(row, col, color) {
  return slidingMoves(row, col, color, [[1,0],[-1,0],[0,1],[0,-1]]);
}
function queenMoves(row, col, color) {
  return slidingMoves(row, col, color, [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]);
}
function kingMoves(row, col, color) {
  let moves = slidingMoves(row, col, color, [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]], 1);
  if (!hasMoved[color+'k']) {
    if (!hasMoved[color+'rH'] &&
      board[row][col+1] === '' && board[row][col+2] === '' &&
      !isSquareAttacked(row, col, color) &&
      !isSquareAttacked(row, col+1, color) && !isSquareAttacked(row, col+2, color)) {
      moves.push([row, col+2]);
    }
    if (!hasMoved[color+'rA'] &&
      board[row][col-1] === '' && board[row][col-2] === '' && board[row][col-3] === '' &&
      !isSquareAttacked(row, col, color) &&
      !isSquareAttacked(row, col-1, color) && !isSquareAttacked(row, col-2, color)) {
      moves.push([row, col-2]);
    }
  }
  return moves;
}

function isSquareAttacked(row, col, color) {
  let enemy = color === 'w' ? 'b' : 'w';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] && board[r][c][0] === enemy) {
        let moves = getValidMoves(r, c, true);
        for (let [mr, mc] of moves) {
          if (mr === row && mc === col) return true;
        }
      }
    }
  }
  return false;
}

function isCheckmate(color) {
  let kingPos = null;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c] === color + 'k') kingPos = [r, c];
  if (!kingPos || !isSquareAttacked(kingPos[0], kingPos[1], color)) return false;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c] && board[r][c][0] === color)
        if (getValidMoves(r, c).length > 0) return false;
  return true;
}
function isStalemate(color) {
  let kingPos = null;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c] === color + 'k') kingPos = [r, c];
  if (!kingPos || isSquareAttacked(kingPos[0], kingPos[1], color)) return false;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c] && board[r][c][0] === color)
        if (getValidMoves(r, c).length > 0) return false;
  return true;
}

function isDraw() {
  if (halfmoveClock >= 100) return true;
  let fen = boardToFEN();
  positionHistory[fen] = (positionHistory[fen]||0)+1;
  if (positionHistory[fen] >= 3) return true;
  return false;
}
function boardToFEN() {
  let fen = '';
  for (let r = 0; r < 8; r++) {
    let empty = 0;
    for (let c = 0; c < 8; c++) {
      let p = board[r][c];
      if (!p) empty++;
      else {
        if (empty > 0) { fen+=empty; empty=0; }
        let ch = p[1];
        fen += (p[0]==='w' ? ch.toUpperCase() : ch.toLowerCase());
      }
    }
    if (empty>0) fen+=empty;
    if (r<7) fen+='/';
  }
  return fen;
}

function handleClick(row, col) {
  if (animating) return;
  if (mode === 'computer' && turn === 'b') return;
  if (selected) {
    if (highlights.some(h => h[0] === row && h[1] === col)) {
      movePiece(selected[0], selected[1], row, col);
      return;
    }
    selected = null;
    highlights = [];
    renderBoard();
  } else {
    let piece = board[row][col];
    if (piece && piece[0] === turn) {
      selected = [row, col];
      highlights = getValidMoves(row, col);
      renderBoard();
    }
  }
}

function undoMove() {
  if (moveHistory.length === 0) return;
  let last = moveHistory.pop();
  board = JSON.parse(last.board);
  hasMoved = JSON.parse(last.hasMoved);
  enPassant = last.enPassant;
  halfmoveClock = last.halfmoveClock;
  turn = last.turn;
  selected = null;
  highlights = [];
  renderBoard();
  Swal.close();
}

function movePiece(sr, sc, tr, tc) {
  let before = JSON.stringify(board);
  let beforeHasMoved = JSON.stringify(hasMoved);
  let beforeEnPassant = enPassant ? enPassant.slice() : null;
  let beforeHalfmove = halfmoveClock;
  let beforeTurn = turn;

  let pieceCode = board[sr][sc];
  let promote = false;
  let isEnPassant = false;
  let isCastling = false;
  if (pieceCode[1] === 'p' && enPassant && tr === enPassant[0] && tc === enPassant[1] && board[tr][tc] === '') {
    isEnPassant = true;
  }
  if (pieceCode[1] === 'k' && Math.abs(tc-sc) === 2) {
    isCastling = true;
  }
  animateMove(sr, sc, tr, tc, pieceCode, () => {
    if (pieceCode === 'wk') hasMoved['wk'] = true;
    if (pieceCode === 'bk') hasMoved['bk'] = true;
    if (pieceCode === 'wr' && sr===7 && sc===0) hasMoved['wrA'] = true;
    if (pieceCode === 'wr' && sr===7 && sc===7) hasMoved['wrH'] = true;
    if (pieceCode === 'br' && sr===0 && sc===0) hasMoved['brA'] = true;
    if (pieceCode === 'br' && sr===0 && sc===7) hasMoved['brH'] = true;
    if (isEnPassant) {
      board[tr][tc] = pieceCode;
      board[sr][sc] = '';
      board[sr][tc] = '';
    } else if (isCastling) {
      board[tr][tc] = pieceCode;
      board[sr][sc] = '';
      if (tc===6) {
        board[tr][5] = board[sr][7];
        board[sr][7] = '';
      } else if (tc===2) {
        board[tr][3] = board[sr][0];
        board[sr][0] = '';
      }
    } else {
      if (pieceCode === 'wp' && tr===0) promote = true;
      if (pieceCode === 'bp' && tr===7) promote = true;
      board[tr][tc] = promote ? (pieceCode[0]+'q') : pieceCode;
      board[sr][sc] = '';
    }
    enPassant = null;
    if (pieceCode[1]==='p' && Math.abs(tr-sr)===2) {
      enPassant = [sr+(tr-sr)/2, sc];
    }
    if (pieceCode[1]==='p' || board[tr][tc]!=='') halfmoveClock=0;
    else halfmoveClock++;
    turn = (turn === 'w' ? 'b' : 'w');
    selected = null; highlights = [];
    moveHistory.push({
      board: before,
      hasMoved: beforeHasMoved,
      enPassant: beforeEnPassant,
      halfmoveClock: beforeHalfmove,
      turn: beforeTurn
    });
    renderBoard();
    checkWinCondition();
    if (mode === 'computer' && turn === 'b') setTimeout(computerMove, 500);
  });
}

function animateMove(fromRow, fromCol, toRow, toCol, pieceCode, afterAnim) {
  const chessboard = document.getElementById('chessboard');

  // Cari ukuran kotak secara dinamis (responsive)
  const square = chessboard.querySelector('.square');
  const squareSize = square ? square.offsetWidth : 60;

  const animDiv = document.createElement('div');
  animDiv.className = 'piece-anim';
  animDiv.innerHTML = PIECES[pieceCode];

  // Posisi awal
  animDiv.style.left = (fromCol * squareSize) + 'px';
  animDiv.style.top = (fromRow * squareSize) + 'px';
  chessboard.appendChild(animDiv);

  animating = true;

  // Animasi jalan
  setTimeout(() => {
    animDiv.style.left = (toCol * squareSize) + 'px';
    animDiv.style.top = (toRow * squareSize) + 'px';
  }, 10);

  // Setelah selesai animasi
  setTimeout(() => {
    chessboard.removeChild(animDiv);
    animating = false;
    afterAnim();
  }, 270);
}

function computerMove() {
  let allMoves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] && board[r][c][0] === 'b') {
        let moves = getValidMoves(r, c);
        moves.forEach(m => allMoves.push({from:[r,c], to:m, piece:board[r][c]}));
      }
    }
  }
  if (allMoves.length === 0) return;
  let kingPos = null, whiteKingPos = null;
  for (let r=0;r<8;r++)for(let c=0;c<8;c++){
    if(board[r][c]==='bk')kingPos=[r,c];
    if(board[r][c]==='wk')whiteKingPos=[r,c];
  }
  if (kingPos && isSquareAttacked(kingPos[0], kingPos[1], 'b')) {
    let defendMoves = [];
    for (let m of allMoves) {
      let [fr, fc] = m.from, [tr, tc] = m.to;
      let backup = board[tr][tc], old = board[fr][fc];
      board[tr][tc]=old; board[fr][fc]='';
      let newKingPos = (old[1]==='k')?[tr,tc]:kingPos;
      let attacked = isSquareAttacked(newKingPos[0], newKingPos[1], 'b');
      board[fr][fc]=old; board[tr][tc]=backup;
      if (!attacked) defendMoves.push(m);
    }
    if (defendMoves.length>0) allMoves=defendMoves;
    else { checkWinCondition(); return; }
  }
  let attackKingMoves = allMoves.filter(m => whiteKingPos && m.to[0]===whiteKingPos[0]&&m.to[1]===whiteKingPos[1]);
  if (attackKingMoves.length > 0) allMoves=attackKingMoves;
  let promoteMoves = allMoves.filter(m => m.piece==='bp'&&m.to[0]===7);
  if (promoteMoves.length > 0) allMoves=promoteMoves;
  let captureMoves = allMoves.filter(m => board[m.to[0]][m.to[1]]!==''&&board[m.to[0]][m.to[1]][0]==='w');
  if (captureMoves.length > 0) allMoves=captureMoves;
  let safeMoves = [];
  for (let m of allMoves) {
    let [fr, fc] = m.from, [tr, tc] = m.to, old = board[fr][fc], backup = board[tr][tc];
    board[tr][tc]=old; board[fr][fc]='';
    let kingPos2 = null; for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(board[r][c]==='bk')kingPos2=[r,c];
    let attacked = isSquareAttacked(kingPos2[0], kingPos2[1], 'b');
    board[fr][fc]=old; board[tr][tc]=backup;
    if (!attacked) safeMoves.push(m);
  }
  if (safeMoves.length > 0) allMoves=safeMoves;
  let pick = allMoves[Math.floor(Math.random()*allMoves.length)];
  movePiece(pick.from[0], pick.from[1], pick.to[0], pick.to[1]);
}

function checkWinCondition() {
  if (isCheckmate('w')) showWinPopup(false);
  else if (isCheckmate('b')) showWinPopup(true);
  else if (isStalemate('w')||isStalemate('b')) showWinPopup(null);
  else if (isDraw()) showWinPopup(null);
}

// === POPUP ===
function showWinPopup(isPlayerWin) {
  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let bgColor = "";
  let imageWidth = 150;
  let imageHeight = 150;

  if (isPlayerWin == null) {
    title = "DRAW";
    subtitle = "Kalian Lawan Yang Seimbang!";
    imageUrl = "images/catur/seimbang.gif";
    bgColor = "#f1c40f";
  } else if (isPlayerWin) {
    title = "KAMU MENANG!";
    subtitle = "Strategi Yang Luar Biasa!";
    imageUrl = "images/catur/menang.gif";
    bgColor = "#27ae60";
  } else {
    title = "KAMU KALAH!";
    subtitle = "Kamu Bisa, Jangan Menyerah!";
    imageUrl = "images/catur/kalah.gif";
    bgColor = "#e74c3c";
  }

  Swal.fire({
    html: `
      <h2 style="margin:0;">${title}</h2>
      <p style="margin-top:5px; font-size:16px; color:#333;">
        ${subtitle}
      </p>
    `,
    imageUrl: imageUrl,
    imageWidth: imageWidth,
    imageHeight: imageHeight,
    confirmButtonText: "Main Lagi",
    confirmButtonColor: bgColor,
    allowOutsideClick: false
  }).then(() => {
    resetGame(mode);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("modeSelect");
  const trigger = select.querySelector(".select-trigger");
  const selectedText = document.getElementById("selectedMode");
  const options = select.querySelectorAll(".options span");

  // buka/tutup dropdown
  trigger.addEventListener("click", () => {
    select.classList.toggle("open");
  });

  // pilih mode
  options.forEach(option => {
    option.addEventListener("click", () => {
      const mode = option.getAttribute("data-mode");
      selectedText.textContent = option.textContent;
      select.classList.remove("open");

      resetGame(mode);
    });
  });

  // klik di luar nutup dropdown
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });

  // 🔥 ini penting → aktifkan Undo lagi
  document.getElementById('undoBtn').onclick = function() {
    undoMove();

    // animasi sukses background
    this.classList.add('success');
    setTimeout(() => this.classList.remove('success'), 500);

    // animasi ikon tekan
    this.classList.add('pressed');
    setTimeout(() => this.classList.remove('pressed'), 150); // durasi animasi ikon
  };

  // default mode pas buka
  resetGame("computer");
});