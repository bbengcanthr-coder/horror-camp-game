const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const bgm = document.getElementById('bgm');
const sfxGhost = document.getElementById('sfx-ghost');

let gameState = {};

function startGame() {
    bgm.play();
    showScene('intro');
}

const scenes = {
    'intro': {
        text: "เวลา 02:45 น.\nวัดศรีปัญญาธรรมาราม จ.ขอนแก่น\n\nท่ามกลางความเงียบของป่าช้าเก่าหลังวัด คุณ (นักเรียน ม.6 ปากคลองวิทยาคม) ตื่นขึ้นมากลางดึกเพราะเสียง 'ครืด...ครืด...' ที่ใต้ถุนกุฏิไม้เก่าๆ เพื่อนร่วมห้องหายไปหมด เหลือเพียงคุณคนเดียว",
        choices: [
            { text: "หยิบไฟฉายแล้วเดินลงไปดูใต้ถุน", nextScene: 'basement' },
            { text: "คลุมโปงแล้วพยายามหลับต่อ", nextScene: 'under_blanket' }
        ]
    },
    'basement': {
        text: "เสียงฝีเท้าของคุณเหยียบลงบนไม้กระดานที่ผุพัง... 'เอี๊ยด...' \n\nเมื่อส่องไฟฉายไปที่ใต้ถุน คุณพบเงาดำตะคุ่มกำลังกัดกินอะไรบางอย่างที่มีชุดพละโรงเรียนปากคลองฯ ติดอยู่! เงานั้นค่อยๆ หันหน้ากลับมา... ใบหน้ามันไม่มีดวงตา!",
        choices: [
            { text: "วิ่งหนีไปทางโบสถ์เก่า", nextScene: 'church', sound: 'ghost' },
            { text: "ตะโกนเรียกชื่อเพื่อนสุดเสียง", nextScene: 'scream' }
        ]
    },
    'under_blanket': {
        text: "คุณซ่อนตัวใต้ผ้าห่ม ลมหายใจติดขัด... ทันใดนั้น คุณรู้สึกว่ามีมือเย็นเฉียบกระชากผ้าห่มจากปลายเท้า! \n\n'มาเล่นด้วยกันสิ...' เสียงกระซิบแหบพร่าดังอยู่ที่ข้างหู",
        choices: [
            { text: "ลุกขึ้นวิ่งออกจากกุฏิ", nextScene: 'basement' },
            { text: "สวดมนต์บทที่แม่ชีสอนเมื่อเย็น", nextScene: 'pray' }
        ]
    },
    'church': {
        text: "คุณวิ่งมาถึงโบสถ์เก่า ประตูไม้บานยักษ์แง้มอยู่เล็กน้อย กลิ่นธูปหอมแรงจนน่าเวียนหัว แต่ในโบสถ์กลับมีเสียงพระสวดสวนทางกับความเป็นจริง... เป็นการสวดบังสุกุลตายให้คุณเอง!",
        choices: [
            { text: "ก้มมองดูใต้หว่างขาตามความเชื่อ", nextScene: 'between_legs', sound: 'ghost' },
            { text: "รีบวิ่งออกไปที่ประตูหน้าวัด", nextScene: 'gate' }
        ]
    },
    'between_legs': {
        text: "คุณก้มลง... ภาพที่เห็นคือเพื่อนๆ ม.6 ทุกคน ยืนห้อยหัวลงมาจากขื่อคาโบสถ์ ทุกคนจ้องมาที่พิกัดเดียวคือ 'คุณ' พร้อมแสยะยิ้มที่ปากฉีกถึงใบหู!\n\n(เสียงประกอบ: เสียงกรีดร้องดังระงม)",
        choices: [
            { text: "สติหลุด... วิ่งหนีสุดชีวิต", nextScene: 'gate' }
        ]
    },
    'gate': {
        text: "คุณวิ่งมาถึงหน้าประตูวัด เห็นแสงไฟจากเซเว่นฝั่งตรงข้ามอยู่ไกลๆ แต่ทางออกกลับถูกกั้นด้วยสายสิญจน์สีดำ และมีร่างของ 'หลวงตา' ยืนขวางไว้ ท่านพูดว่า...\n\n'จะรีบไปไหน... ค่ายยังไม่จบเลยนะลูก'",
        choices: [
            { text: "จบการรันระบบ: คุณรอด (แต่เสียสติ)", nextScene: 'ending' }
        ]
    },
    'ending': {
        text: "เช้าวันรุ่งขึ้น... เพื่อนๆ พบคุณนั่งเหม่อลอยอยู่หน้าเจดีย์เก็บอัฐิ ไม่มีใครจำเหตุการณ์เมื่อคืนได้ และที่คอของคุณมีรอยช้ำรูปมือสีดำสนิทติดตัวไปตลอดกาล...",
        choices: [
            { text: "เริ่มใหม่อีกครั้ง", nextScene: 'intro' }
        ]
    }
};

function showScene(sceneKey) {
    const scene = scenes[sceneKey];
    
    // Play SFX if defined
    if (scene.sound === 'ghost') {
        sfxGhost.play();
    }

    textDisplay.innerText = scene.text;
    choicesContainer.innerHTML = '';

    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.classList.add('choice-btn');
        button.onclick = () => {
            document.getElementById('sfx-click').play();
            showScene(choice.nextScene);
        };
        choicesContainer.appendChild(button);
    });
}
