let username;
let relation;
let questions;
let allQuestions;
let currentQuestion = 0;
let answers = [];
let hint;

const categories = { M: 0, E: 0, Su: 0, D: 0, St: 0, C: 0 };
const maxScores = { M: 20, E: 10, Su: 20, D: 15, St: 15, C: 15 };

const surveyContainer = document.getElementById("surveyContainer");
const resultsDiv = document.getElementById("results");
const progressBar = document.getElementById("progress");
const partNames =
{
    family: "Family Relationships",
    love: "Romantic Relationships",
    friends: "Friendship Dynamics",
    teacher: "Teacher-Student Interactions",
    colleague: "Colleague Relations",
    common: "General Relationships",
};

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz');
const currNumber = document.getElementById('curr-number')

document.getElementById('surveyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    relation = document.getElementById('relation').value;
    username = document.getElementById("name").value;
    document.querySelector('.progress-bar').classList.remove('hidden');
    document.getElementById('surveyForm').classList.add('hidden');
    questions = {
        common:
            [
                {
                    text: `Q1. Mô tả chung về sự ảnh hưởng của mối quan hệ này đến việc học của bạn?`,
                    choices: [
                        { text: `Rất tích cực`, scores: [10, 10, 10, -5, -5, -5] },
                        { text: `Tích cực`, scores: [5, 5, 5, -3, -3, -3] },
                        { text: `Bình thường`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tiêu cực`, scores: [-3, -3, -3, 5, 5, 5] },
                        { text: `Rất tiêu cực`, scores: [-5, -5, -5, 10, 10, 10] },
                    ],
                },

                {
                    text: `Q2. Mức độ dành thời gian của bạn cho mối quan hệ này?`,
                    choices: [
                        { text: `Rất nhiều thời gian`, scores: [0, 0, 10, 5, 0, 0] },
                        { text: `Đủ thời gian`, scores: [0, 0, 8, 0, 0, 0] },
                        { text: `Ít thời gian`, scores: [0, 0, 3, 3, 0, 0] },
                        { text: `Hầu như không dành thời gian`, scores: [0, 0, 0, 10, 0, 0] },
                    ],
                },

                {
                    text: `Q3. Bạn cảm thấy áp lực từ việc cân bằng thời gian dành ra cho mối quan hệ với thời gian học tập của bạn?`,
                    choices: [
                        { text: `Có, rất nhiều`, scores: [0, 0, 0, 5, 5, 0] },
                        { text: `Có, nhiều`, scores: [0, 0, 0, 3, 3, 0] },
                        { text: `Có, nhưng ít`, scores: [0, 0, 0, 1, 1, 0] },
                        { text: `Không có hoặc không đáng kể`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q4. Tương tác thường xuyên với ${username.bold()} có ảnh hưởng như thế nào đến tinh thần và cảm hứng học tập của bạn?`,
                    choices: [
                        { text: `Rất áp lực, khiến bạn cảm thấy mệt mỏi`, scores: [5, 5, 5, 0, 0, 0] },
                        { text: `Có áp lực nhưng ở mức nhẹ`, scores: [3, 3, 3, 0, 0, 0] },
                        { text: `Trung tính, không bị ảnh hưởng nhiều`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tích cực, áp lực vừa đủ để bạn cố gắng hơn`, scores: [-3, -3, 0, 0, 0, 0] },
                        { text: `Hoàn toàn tích cực, tạo động lực để bạn phát triển bản thân`, scores: [-5, -5, -5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q5. ${username} có khuyến khích, thúc đẩy hay truyền cảm hứng để bạn đạt được những mục tiêu cao hơn, những kiến thức mới hơn trong việc học hay không?`,
                    choices: [
                        { text: `Rất nhiều`, scores: [0, 10, 0, 0, 0, 0] },
                        { text: `Nhiều`, scores: [0, 8, 0, 0, 0, 0] },
                        { text: `Vừa phải`, scores: [0, 5, 0, 0, 0, 0] },
                        { text: `Ít`, scores: [0, 3, 0, 0, 0, 0] },
                        { text: `Rất ít`, scores: [0, 1, 0, 0, 0, 0] },
                        { text: `Không có`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q6. ${username} có hay làm phiền, gián đoạn việc học của bạn hay không?`,
                    choices: [
                        { text: `Luôn luôn`, scores: [0, 0, 0, 5, 5, 0] },
                        { text: `Thường xuyên`, scores: [0, 0, 0, 4, 4, 0] },
                        { text: `Thỉnh Thoảng`, scores: [0, 0, 0, 2, 2, 0] },
                        { text: `Hiếm khi`, scores: [0, 0, 0, 1, 1, 0] },
                        { text: `Không bao giờ`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q7. Bạn cảm thấy như thế nào khi chia sẻ những dự định hay vấn đề các nhân trong việc học với ${username}?`,
                    choices: [
                        { text: `Thoải mái, dễ chịu`, scores: [0, 0, 5, 0, 0, 0] },
                        { text: `Thoải mái, nhưng hơi ngại ngùng vì sợ phiền`, scores: [0, 0, 2, 0, 0, 0] },
                        { text: `Ngại ngùng, không thoải mái`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Tôi không muốn chia sẻ với ${username}`, scores: [0, 0, -5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q8. ${username} có tôn trọng hay ủng hộ những quyết định trong việc học của bạn hay không?`,
                    choices: [
                        { text: `Rất tôn trọng và ủng hộ`, scores: [0, 5, 5, 0, -5, -5] },
                        { text: `Tôn trọng và ủng hộ`, scores: [0, 3, 3, 0, -3, -3] },
                        { text: `Trung lập`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Không tôn trọng hoặc không ủng hộ`, scores: [0, -3, -3, 0, 3, 3] },
                        { text: `Phản đối mạnh mẽ`, scores: [0, -5, -5, 0, 5, 5] },
                    ],
                },

                {
                    text: `Q9. Bạn có cảm thấy những vấn đề của mình được lắng nghe và thấu hiểu mỗi lần chia sẻ với ${username} hay không?`,
                    choices: [
                        { text: `Luôn luôn được lắng nghe và thấu hiểu`, scores: [5, 5, 5, 0, -5, 0] },
                        { text: `Thường xuyên được lắng nghe và thấu hiểu`, scores: [3, 3, 3, 0, -3, 0] },
                        { text: `Thỉnh thoảng được lắng nghe và thấu hiểu`, scores: [2, 2, 2, 0, -1, 0] },
                        { text: `Hiếm khi được lắng nghe và thấu hiểu`, scores: [1, 1, 1, 0, 0, 0] },
                        { text: `Không bao giờ được lắng nghe và thấu hiểu`, scores: [-5, -5, -5, 0, 5, 0] },
                    ],
                },

                {
                    text: `Q10. Những thành tích trong con đường học vấn (và nghiên cức) của ${username} ảnh hưởng đến bạn như thế nào?`,
                    choices: [
                        { text: `Nó là động lực và là nguồn cảm hứng rất lớn giúp tôi học hỏi và phát triển nhiều hơn`, scores: [5, 0, 0, 0, -5, 0] },
                        { text: `Nó vừa là động lực, vừa khiến tôi muốn học hỏi và phát triển hơn`, scores: [2, 0, 0, 0, -2, 0] },
                        { text: `Nó khiến tôi thất vọng và mất tự tin vào bản thân`, scores: [-2, 0, 0, 0, 2, 0] },
                        { text: `Nó khiến tôi vô cùng thất vọng và cảm thấy vô cùng áp lực`, scores: [-5, 0, 0, 0, 5, 0] },
                        { text: `Không quá ảnh hưởng hoặc không quan tâm`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q11. Giữa bạn và ${username} có hay thường xuyên xảy ra mâu thuẫn, bất đồng quan điểm hay không?`,
                    choices: [
                        { text: `Luôn luôn`, scores: [0, 0, 0, 5, 5, 10] },
                        { text: `Thường xuyên`, scores: [0, 0, 0, 3, 3, 8] },
                        { text: `Thỉnh thoảng`, scores: [0, 0, 0, 2, 2, 5] },
                        { text: `Hiếm khi`, scores: [0, 0, 0, 1, 1, 2] },
                        { text: `Không bao giờ`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q12. Mức độ ảnh hưởng của mâu thuẫn hay bất đồng quan điểm đến sự tập trung và tinh thần học tập của bạn?`,
                    choices: [
                        { text: `Rất nhiều`, scores: [0, 0, 0, 10, 10, 0] },
                        { text: `Nhiều`, scores: [0, 0, 0, 8, 8, 0] },
                        { text: `Trung bình`, scores: [0, 0, 0, 5, 5, 0] },
                        { text: `Ít`, scores: [0, 0, 0, 3, 3, 0] },
                        { text: `Rất ít`, scores: [0, 0, 0, 1, 1, 0] },
                        { text: `Không ảnh hưởng`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q13. Bạn cảm thấy như thế nào khi yêu cầu hỗ trợ từ ${username} trong việc học của bạn?`,
                    choices: [
                        { text: `Thoải mái, tự tin rằng họ sẽ luôn giúp đỡ`, scores: [0, 0, 5, 0, 0, 0] },
                        { text: `Thoải mái, nhưng hơi ngại ngùng vì sợ phiền`, scores: [0, 0, 2, 0, 0, 0] },
                        { text: `Không thoải mái nhưng vẫn yêu cầu khi cần thiết`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Cảm thấy rất không thoải mái và hiếm khi ngỏ lời`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Tôi không yêu cầu giúp đỡ gì từ ${username}`, scores: [0, 0, -5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q14. Những khó khăn trong học tập hay những yêu cầu hỗ trợ của bạn được ${username} sẵn sàng giúp đỡ với tần suất như thế nào?`,
                    choices: [
                        { text: `Luôn luôn giúp đỡ khi thấy tôi ngỏ lời hoặc gặp khó khăn`, scores: [0, 5, 10, 0, 0, 0] },
                        { text: `Thường xuyên giúp đỡ tôi`, scores: [0, 3, 8, 0, 0, 0] },
                        { text: `Thỉnh thoảng giúp tôi một vài lần`, scores: [0, 2, 5, 0, 0, 0] },
                        { text: `Hiếm khi họ giúp tôi`, scores: [0, 1, 2, 0, 0, 0] },
                        { text: `Không bao giờ`, scores: [0, 0, -5, 0, 0, 0] },
                        { text: `Tôi không yêu cầu giúp đỡ gì từ người ấy`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q15. Bạn có thường nhận được sự giúp đỡ của ${username} khi cần gấp không?`,
                    choices: [
                        { text: `Luôn luôn`, scores: [0, 3, 5, 0, 0, 0] },
                        { text: `Thường xuyên`, scores: [0, 2, 4, 0, 0, 0] },
                        { text: `Thỉnh thoảng`, scores: [0, 1, 2, 0, 0, 0] },
                        { text: `Hiếm khi`, scores: [0, 0, 1, 0, 0, 0] },
                        { text: `Không bao giờ`, scores: [0, 0, -5, 0, 0, 0] },
                        { text: `Tôi không yêu cầu giúp đỡ gì từ ${username}`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

            ],

        family:
            [
                {
                    text: `Q16. ${username} có chủ động chăm sóc sức khỏe cho bạn không?`,
                    choices: [
                        { text: `Không bao giờ quan tâm`, scores: [0, 0, -5, 0, 0, 0] },
                        { text: `Thỉnh thoảng nhắc nhở nhưng không thực sự hành động`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Quan tâm ở mức vừa phải, chỉ khi bạn cần`, scores: [0, 1, 1, 0, 0, 0] },
                        { text: `Quan tâm thường xuyên, hành động cụ thể để chăm lo cho sức khỏe`, scores: [0, 3, 3, 0, 0, 0] },
                        { text: `Rất chủ động, luôn đặt sức khỏe của bạn lên hàng đầu`, scores: [0, 5, 5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q17. Sự đầu tư về mặt vật chất của ${username} vào việc học của bạn ảnh hưởng đến bạn như thế nào?`,
                    choices: [
                        { text: `Rất tích cực, nó tạo ra cho tôi rất nhiều động lực để tôi phấn đấu nhiều hơn`, scores: [5, 5, 5, 0, 0, 0] },
                        { text: `Tích cực, tôi biết ơn, trân trọng và coi đó như nguồn động lực để tôi tiến lên`, scores: [2, 2, 2, 0, 0, 0] },
                        { text: `Bình thường, nó cũng không ảnh hưởng nhiều lắm`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tiêu cực, nó vô hình tạo ra cho tôi những áp lực`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Rất tiêu cực, tôi cảm thấy rất áp lực và cảm giác mình không xứng đáng`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Người này không gánh trách nhiệm đầu tư vật chất cho tôi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q18. ${username} có giúp đỡ và hỗ trợ bạn trong việc định hướng việc học và nghề nghiệp hay không?`,
                    choices: [
                        { text: `Không giúp gì`, scores: [0, 0, -2, 0, 0, 0] },
                        { text: `Thỉnh thoảng nhắc nhở chung chung`, scores: [0, 0, 2, 0, 0, 0] },
                        { text: `Có hỗ trợ cơ bản nhưng chưa đủ sâu`, scores: [0, 0, 5, 0, 0, 0] },
                        { text: `Hỗ trợ rõ ràng, định hướng có ích`, scores: [0, 0, 8, 0, 0, 0] },
                        { text: `Định hướng sát sao, luôn đồng hành cùng bạn`, scores: [0, 0, 10, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q19. Sự can thiệp của ${username} vào con đường học của bạn khiến bạn cảm thấy như thế nào?`,
                    choices: [
                        { text: `Rất khó chịu, cảm thấy mất tự do`, scores: [0, 0, 0, 0, 5, 5] },
                        { text: `Hơi khó chịu nhưng có thể chịu được`, scores: [0, 0, 0, 0, 2, 2] },
                        { text: `Trung tính, không thấy phiền hoặc hài lòng`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Hài lòng, cảm thấy có sự quan tâm đúng mức`, scores: [0, 2, 2, 0, 0, 0] },
                        { text: `Rất hài lòng, cảm giác mình được định hướng đúng`, scores: [0, 5, 5, 0, 0, 0] },
                        { text: `Họ không can thiệp vào việc học của tôi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q20. Mức độ can thiệp của ${username} ảnh hưởng thế nào đến khả năng tự lập trong học tập của bạn?`,
                    choices: [
                        { text: `Hoàn toàn cản trở, mất khả năng tự lập`, scores: [-5, 0, 0, 0, 0, 5] },
                        { text: `Ảnh hưởng tiêu cực, khiến tôi không được quyết định một số lựa chọn cho bản thân`, scores: [-2, 0, 0, 0, 0, 2] },
                        { text: `Trung tính, không ảnh hưởng lớn`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Hỗ trợ ở mức vừa phải, giúp phát triển tự lập`, scores: [2, 0, 0, 0, 0, -2] },
                        { text: `Hỗ trợ tốt, bạn vẫn tự lập hoàn toàn`, scores: [5, 0, 0, 0, 0, -2] },
                        { text: `Họ không can thiệp vào việc học của tôi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q21. Kỳ vọng của ${username} vào thành tích học tập của bạn khiến bạn cảm thấy như thế nào?`,
                    choices: [
                        { text: `Rất áp lực`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Áp lực nhẹ`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Trung tính, không thấy áp lực`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Có động lực từ kỳ vọng`, scores: [2, 0, 0, 0, 0, 0] },
                        { text: `Hoàn toàn tự tin, tràn trề động lực để đạt được những kì vọng đó`, scores: [5, 2, 0, 0, 0, 0] },
                        { text: `Họ không kì vọng gì từ kết quả học tập của tôi`, scores: [-2, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q22. Thái độ của ${username} như thế nào khi việc học của bạn không đạt được những kì vọng của họ?`,
                    choices: [
                        { text: `Rất gay gắt, trách móc nặng nề`, scores: [0, 0, 0, 0, 5, 5] },
                        { text: `Trách móc nhẹ nhưng vẫn tiêu cực`, scores: [0, 0, 0, 0, 2, 2] },
                        { text: `Trung tính, không phản ứng gì lớn`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Cảm thông, động viên bạn cải thiện`, scores: [0, 2, 2, 0, 0, 0] },
                        { text: `Rất hiểu và cảm thông, động viên và đưa ra những giải pháp cụ thể để giúp bạn cải thiện`, scores: [0, 5, 5, 0, 0, 0] },
                        { text: `Họ không kì vọng gì hết từ kết quả học tập của tôi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },
            ],
        love:
            [
                {
                    text: `Q16. ${username} có chủ động chăm sóc cho sức khỏe của bạn không?`,
                    choices: [
                        { text: `Không bao giờ quan tâm`, scores: [0, 0, -5, 0, 0, 0] },
                        { text: `Thỉnh thoảng nhắc nhở nhưng không thực sự hành động`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Quan tâm ở mức vừa phải, chỉ khi bạn cần`, scores: [0, 1, 1, 0, 0, 0] },
                        { text: `Quan tâm thường xuyên, hành động cụ thể để chăm lo cho sức khỏe`, scores: [0, 3, 3, 0, 0, 0] },
                        { text: `Rất chủ động, luôn đặt sức khỏe của bạn lên hàng đầu`, scores: [0, 5, 5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q17. Bạn có thường học cùng ${username} hay không?`,
                    choices: [
                        { text: `Luôn luôn`, scores: [0, 5, 0, 0, 0, 0] },
                        { text: `Thường xuyên`, scores: [0, 4, 0, 0, 0, 0] },
                        { text: `Thỉnh thoảng`, scores: [0, 2, 0, 0, 0, 0] },
                        { text: `Hiếm khi`, scores: [0, 1, 0, 0, 0, 0] },
                        { text: `Không bao giờ`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q18. Hiệu quả từ việc học cùng ${username} như thế nào?`,
                    choices: [
                        { text: `Rất hiệu quả, rất tập trung và giúp đỡ hỗ trợ nhau rất nhiều`, scores: [0, 0, 5, 0, 0, 0] },
                        { text: `Hiệu quả, cả 2 khá tập trung vào học`, scores: [0, 0, 2, 0, 0, 0] },
                        { text: `Trung tính, có lúc tập trung có lúc xao nhãng`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Không hiệu quả, khó tập trung`, scores: [0, 0, 0, 2, 0, 0] },
                        { text: `Rất không hiệu quả, không tập trung và cũng không hộ trợ được nhiều cho nhau`, scores: [0, 0, 0, 5, 0, 0] },
                        { text: `Chúng tôi không học cùng nhau`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q19. ${username} có thường rủ bạn đi chơi, giải trí hay tham gia các hoạt động ngoại khóa không?`,
                    choices: [
                        { text: `Luôn luôn`, scores: [0, 0, 0, 10, -10, 0] },
                        { text: `Thường xuyên`, scores: [0, 0, 0, 8, -8, 0] },
                        { text: `Thỉnh thoảng`, scores: [0, 0, 0, 5, -5, 0] },
                        { text: `Hiếm khi`, scores: [0, 0, 0, 2, -2, 0] },
                        { text: `Không bao giờ`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q20. Sự ảnh hưởng của những thói quen xấu từ ${username} đến bạn?`,
                    choices: [
                        { text: `Ảnh hưởng tiêu cực rất nhiều`, scores: [0, 0, 0, 5, 0, 0] },
                        { text: `Ảnh hưởng tiêu cực nhưng nhẹ`, scores: [0, 0, 0, 2, 0, 0] },
                        { text: `Không ảnh hưởng`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Có ảnh hưởng tích cực gián tiếp, vì tôi biết đó là những thói quen xấu nên tôi tránh được chúng`, scores: [0, 0, 0, -5, 0, 0] },
                    ],
                },

                {
                    text: `Q21. Kì vọng của ${username} vào thành tích học tập của bạn khiến bạn cảm thất như thế nào?`,
                    choices: [
                        { text: `Rất áp lực`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Áp lực nhẹ`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Trung tính, không thấy áp lực`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Có động lực từ kì vọng`, scores: [2, 0, 0, 0, 0, 0] },
                        { text: `Hoàn toàn tự tin, tràn trề động lực để đạt được những kì vọng đó`, scores: [5, 2, 0, 0, 0, 0] },
                        { text: `Họ không kì vọng gì từ kết quả học tập của tôi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },
            ],
        friends:
            [
                {
                    text: `Q16. Bạn có thường học cùng ${username} hay không?`,
                    choices: [
                        { text: `Luôn luôn`, scores: [0, 5, 0, 0, 0, 0] },
                        { text: `Thường xuyên`, scores: [0, 4, 0, 0, 0, 0] },
                        { text: `Thỉnh thoảng`, scores: [0, 2, 0, 0, 0, 0] },
                        { text: `Hiếm khi`, scores: [0, 1, 0, 0, 0, 0] },
                        { text: `Không bao giờ`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q17. Hiệu quả từ việc học cùng ${username} như thế nào?`,
                    choices: [
                        { text: `Rất hiệu quả, rất tập trung và giúp đỡ hỗ trợ nhau rất nhiều`, scores: [0, 0, 5, 0, 0, 0] },
                        { text: `Hiệu quả, ca 2 khá tập trung vào học`, scores: [0, 0, 2, 0, 0, 0] },
                        { text: `Trung tính, có lúc tập trung có lúc xao nhãng`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Không hiệu quả, khó tập trung`, scores: [0, 0, 0, 2, 0, 0] },
                        { text: `Rất không hiệu quả, không tập trung và cũng không hỗ trợ được nhiều cho nhau`, scores: [0, 0, 0, 5, 0, 0] },
                        { text: `Chúng tôi không học cùng nhau`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q18. ${username} có thường rủ bạn đi chơi, tán gẫu, giải trí hay tham gia các hoạt động ngoại khóa không?`,
                    choices: [
                        { text: `Luôn luôn`, scores: [0, 0, 0, 10, -10, 0] },
                        { text: `Thường xuyên`, scores: [0, 0, 0, 8, -8, 0] },
                        { text: `Thỉnh thoảng`, scores: [0, 0, 0, 5, -5, 0] },
                        { text: `Hiếm khi`, scores: [0, 0, 0, 2, -2, 0] },
                        { text: `Không bao giờ`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q19. Sự ảnh hưởng của những thói quen xấu từ ${username} đến bạn?`,
                    choices: [
                        { text: `Ảnh hưởng tiêu cực rất nhiều`, scores: [0, 0, 0, 5, 0, 0] },
                        { text: `Ảnh hưởng tiêu cực nhưng nhẹ`, scores: [0, 0, 0, 2, 0, 0] },
                        { text: `Không ảnh hưởng`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Có ảnh hưởng tích cực gián tiếp, vì tôi biết đó là những thói quen xấu nên tôi tránh được chúng`, scores: [0, 0, 0, -5, 0, 0] },
                    ],
                },

                {
                    text: `Q20. Kì vọng của ${username} vào thành tích học tập của bạn khiến bạn cảm thất như thế nào?`,
                    choices: [
                        { text: `Rất áp lực`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Áp lực nhẹ`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Trung tính, không thấy áp lực`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Có động lực từ kì vọng`, scores: [2, 0, 0, 0, 0, 0] },
                        { text: `Hoàn toàn tự tin, tràn trề động lực để đạt được những kì vọng đó`, scores: [5, 2, 0, 0, 0, 0] },
                        { text: `Họ không kì vọng gì từ kết quả học tập của tôi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                }
            ],
        teacher:
            [
                {
                    text: `Q16. Phong cách giảng dạy của ${username} ảnh hưởng thế nào đến bạn?`,
                    choices: [
                        { text: `Không phù hợp, khiên bạn khó hiểu và chán nản`, scores: [-5, -5, -5, 5, 5, 0] },
                        { text: `Thiếu hấp dẫn, khiến bạn cảm thấy ít hứng thú và chán`, scores: [-2, -2, -2, 2, 2, 0] },
                        { text: `Bình thường, không gây ảnh hưởng nhiều`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tương đối tốt, giúp bạn học hiệu quả`, scores: [2, 2, 2, -2, -2, 0] },
                        { text: `Rất phù hợp, truyền cảm hứng và giúp bạn đạt kết quả tốt`, scores: [5, 5, 5, -5, -5, 0] },
                    ],
                },

                {
                    text: `Q17. ${username} có quan tâm, nhắc nhở về thái độ, tiến độ học tập của bạn hay không?`,
                    choices: [
                        { text: `Không quan tâm, bạn cảm thấy bị bỏ rơi`, scores: [0, -5, -5, 0, 0, 0] },
                        { text: `Quan tâm ít. thỉnh thoảng nhắc nhở`, scores: [0, -2, -2, 0, 0, 0] },
                        { text: `Quan tâm vừa phải, nhắc nhở khi cần thiết`, scores: [0, 1, 1, 0, 0, 0] },
                        { text: `Quan tâm tốt, giúp bạn cải thiện kịp thời`, scores: [0, 3, 3, 0, 0, 0] },
                        { text: `Rất quan tâm, theo dõi sát sao và nhắc nhở, khuyên khích hoàn thành tiến độ học tập`, scores: [0, 5, 5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q18. Những câu trả lời giải đáp của ${username} có đủ làm bạn hài lòng hay không?`,
                    choices: [
                        { text: `Không rõ ràng, khiến bạn thêm rối`, scores: [0, 0, -5, 0, 0, 0] },
                        { text: `Trả lời hời hợt, không đầy đủ`, scores: [0, 0, -3, 0, 0, 0] },
                        { text: `Đủ để hiểu vấn đề cơ bản`, scores: [0, 0, 2, 0, 0, 0] },
                        { text: `Rõ ràng, đầy đủ, khiến bạn cảm thấy hài lòng`, scores: [0, 0, 4, 0, 0, 0] },
                        { text: `Rất chi tiết, giải thích thấu đáo mọi khía cạnh`, scores: [0, 0, 5, 0, 0, 0] },
                        { text: `Tôi không hỏi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q19. Những áp lực (giao bài tập, deadline,...) mà ${username} tạo ra cho bạn ảnh hưởng như thế nào đến bạn?`,
                    choices: [
                        { text: `Rất áp lực, khiến bạn kiệt sức`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Tương đối áp lực, làm giảm hiệu quả học tập`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Bình thường, áp lực ở mức chấp nhận được và không ảnh hưởng nhiều`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tạo động lực để bạn cải thiện bản thân`, scores: [2, 0, 0, 0, 0, 0] },
                        { text: `Động lực lớn giúp bạn rèn luyện kỹ năng và nâng cao kết quả học tập`, scores: [5, 0, 0, 0, 0, 0] },
                    ],
                }
            ],
        colleague:
            [
                {
                    text: `Q16. Cảm giác của bạn khi làm việc nhóm cùng với người ${username}?`,
                    choices: [
                        { text: `Rất khó chịu, không thể hợp tác được`, scores: [0, 0, 0, 5, 5, 5] },
                        { text: `Không thoải mái, hợp tác kém`, scores: [0, 0, 0, 2, 2, 2] },
                        { text: `Trung bình, có thể làm việc nhưng không nổi bật`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tương đối thoải mái, hợp tác tốt`, scores: [2, 2, 2, 0, 0, 0] },
                        { text: `Rất hài lòng, làm việc hiệu quả cao`, scores: [5, 5, 5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q17. Khi làm việc nhóm, ${username} có tôn trọng ý kiến, đề xuất của bạn không?`,
                    choices: [
                        { text: `Không bao giờ lắng nghe, thường bỏ qua ý kiến`, scores: [0, 0, 0, 0, 5, 5] },
                        { text: `Lắng nghe ít, thường xuyên phản đối`, scores: [0, 0, 0, 0, 2, 2] },
                        { text: `Chấp nhận ý kiến ở mức cơ bản`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tôn trọng và thảo luận ý kiến một cách tích cực`, scores: [0, 2, 2, 0, 0, 0] },
                        { text: `Rất tôn trọng, thường xuyên áp dụng ý kiến của bạn`, scores: [0, 5, 5, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q18. Những áp lực (giao nhiệm vụ, deadline, đòi hỏi về công việc, ...) mà ${username} tạo ra cho bạn ảnh hưởng như thê nào đến bạn?`,
                    choices: [
                        { text: `Rất áp lực, khiến bạn kệt sức`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Tương đối áp lực, làm giảm hiệu quả làm việc`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Bình thường, áp lực ở mức chấp nhận được`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tạo động lực để bạn cải thiện bản thân`, scores: [2, 0, 0, 0, 0, 0] },
                        { text: `Động lực lớn giúp bạn rèn luyện kỹ năng và nâng cao khả năng làm việc`, scores: [5, 0, 0, 0, 0, 0] },
                        { text: `Người ấy không tạo ra những áp lực cho tôi`, scores: [0, 0, 0, 0, 0, 0] },
                    ],
                },

                {
                    text: `Q19. Bạn có cảm thấy áp lực phải làm tốt hơn ${username} trong công việc nhóm không?`,
                    choices: [
                        { text: `Rất áp lực, khiến bạn cảm thấy mệt mỏi`, scores: [0, 0, 0, 0, 5, 0] },
                        { text: `Có áp lực nhưng ở mức nhẹ`, scores: [0, 0, 0, 0, 2, 0] },
                        { text: `Trung tính, không bị ảnh hưởng nhiều`, scores: [0, 0, 0, 0, 0, 0] },
                        { text: `Tích cực, áp lực vừa đủ để bạn cố gắng hơn`, scores: [2, 0, 0, 0, 0, 0] },
                        { text: `Hoàn toàn tích cực, tạo động lực để bạn phát triển bản thân`, scores: [5, 0, 0, 0, 0, 0] },
                    ],
                },
            ],
    };
    surveyContainer.style.display = 'block'
    allQuestions = [...questions.common, ...questions[relation]];
    renderQuestion();
});


function renderQuestion() {

    if (currentQuestion >= allQuestions.length) {
        showResults();
        return;
    }

    // Determine which part name to display
    let partName = "Common Question Part";
    if (currentQuestion >= 15) {
        if (relation in partNames) {
            partName = partNames[relation];
        }
    }

    document.getElementById("partName").innerText = partName;
    document.getElementById("partName").style.display = "block"; // Show part name element

    const question = allQuestions[currentQuestion];
    currNumber.textContent = question.text.substring(0, question.text.indexOf('.'));
    questionEl.textContent = question.text.substring(question.text.indexOf(' '),);
    optionsEl.innerHTML = '';
    question.choices.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.classList.add('option');
        button.scores = option.scores
        button.addEventListener('click', () => selectOption(button, index));
        optionsEl.appendChild(button);
    });
    nextBtn.style.display = 'none';

    // Display the part name

    const progressPercent = ((currentQuestion / allQuestions.length) * 100).toFixed(0);
    progressBar.style.width = `${progressPercent}%`;
    progressBar.textContent = `${currentQuestion}/${allQuestions.length}`
}

function selectOption(selectedButton, optionIndex) {
    const buttons = optionsEl.getElementsByClassName('option');
    Array.from(buttons).forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    selectedButton.id = "curr-selected"
    nextBtn.style.display = 'block';
}


function updateScores(scores) {
    categories.M += scores[0];
    categories.E += scores[1];
    categories.Su += scores[2];
    categories.D += scores[3];
    categories.St += scores[4];
    categories.C += scores[5];
}

let selectedRelation = ''; // Store the selected relation

document.getElementById('surveyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    selectedRelation = document.getElementById('relation').value; // Save selected relation
    document.getElementById('surveyForm').classList.add('hidden');
    renderQuestion(selectedRelation); // Pass relation to renderQuestion
});

function showResults() {
    progressBar.style.width = "100%";
    surveyContainer.style.display = "none";
    resultsDiv.style.display = "block";

    const normalizedScores = {};
    for (const key in categories) {
        normalizedScores[key] = categories[key];
    }

    console.log(normalizedScores)

    const labels = ["Motivation (M)", "Encouragement (E)", "Supportiveness (Su)", "Distraction (D)", "Stress (St)", "Conflict (C)"];
    const data = Object.values(normalizedScores);

    const ctx = document.getElementById("resultsChart").getContext("2d");
    new Chart(ctx, {
        type: "radar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Relationship Impact",
                    data: data,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            // scale: {
            //     ticks: {
            //         // beginAtZero: true,
            //         max: 100
            //     }
            // }
        },
    });
}

function getHint() {

}

// Attach event listener to the retry button only once
document.getElementById("retryQuiz").addEventListener("click", resetQuiz);

function resetQuiz() {
    currentQuestion = 0;
    for (let key in categories) {
        categories[key] = 0; // Reset all category scores
    }
    progressBar.style.width = "0%"; // Reset progress bar
    surveyContainer.style.display = "block";
    resultsDiv.style.display = "none";
    document.getElementById("retryQuiz").style.display = "none"; // Hide retry button during the quiz
    renderQuestion(selectedRelation); // Pass the saved relation
}

nextBtn.addEventListener('click', () => {
    if (currentQuestion < allQuestions.length) {
        const finalChoice = document.getElementById("curr-selected");
        answers.push(finalChoice.textContent)
        console.log(answers)
        updateScores(finalChoice.scores)
        currentQuestion++;
        renderQuestion();
    }
});
