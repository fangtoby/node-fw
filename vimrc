"/usr/share/vim
" Configuration file for vim
set modelines=0		" CVE-2007-2438

" Normally we use vim-extensions. If you want true vi-compatibility
" remove change the following statements
set nocompatible	" Use Vim defaults instead of 100% vi compatibility
set backspace=2		" more powerful backspacing

" Don't write backup file if vim is being called by "crontab -e"
au BufWrite /private/tmp/crontab.* set nowritebackup
" Don't write backup file if vim is being called by "chpass"
au BufWrite /private/etc/pw.* set nowritebackup



"edit by honest.lie
"date 2014-2-22 15:10:00

"syntax
syntax on
"set auto indent
set autoindent
"set c/c++ auto indent
set cindent
"set number
set number
"set colorscheme 
colorscheme delek

:inoremap <S-ENTER> <c-r>=SkipPair()<CR>
:inoremap <S-SPACE> <ESC>la
:inoremap <C-ENTER> <ESC>A;<CR>
:inoremap ( ()<ESC>i
:inoremap ) <c-r>=ClosePair(')')<CR>
:inoremap { <c-r>=ClsoeBrace()<CR>
:inoremap } <c-r>=ClosePair('}')<CR>
:inoremap [ []<ESC>i
:inoremap ] <c-r>=ClosePair(']')<CR>
:inoremap ;; <ESC>A;<CR>

function ClosePair(char)
	if getline('.')[col('.') - 1] == a:char
		return "\<Right>"
	else
		return a:char
	endif
	endf
function Semicolon()
	"echo getline('.')[col('.')]
	if getline('.')[col('.')] == ')'
		return "<ESC>A;"
	elseif getline('.')[col('.')] == '}'
		return "\<ESC>A;"
	elseif getline('.')[col('.')] == ']'
		return "\<ESC>A;"
	else
		return ";"
	endif
	endf
function SkipPair()
	if getline('.')[col('.') - 1] == ')'
		return "\<ESC>o"
	else
		normal j
		let curline = line('.')
		let nxtline = curline
	while curline == nxtline
	if getline('.')[col('.') - 1] == '}'
	normal j
	let nxtline = nxtline + 1
	let curline = line('.')
	continue
	else
	return "\<ESC>i"
	endif

	endwhile
	return "\<ESC>o"
	endif
	endf
function ClsoeBrace()
	if getline('.')[col('.') - 2] == '='
	return "{}\<ESC>i"
	elseif getline('.')[col('.') - 3] == '='
	return "{}\<ESC>i"
	elseif getline('.')[col('.') - 1] == '{'
	return "{}\<ESC>i"
	elseif getline('.')[col('.') - 2] == '{'
	return "{}\<ESC>i"
	elseif getline('.')[col('.') - 2] == ','
	return "{}\<ESC>i"
	elseif getline('.')[col('.') - 3] == ','
	return "{}\<ESC>i"
	else
	return "{\<ENTER>}\<ESC>O"
	endif
	endf
