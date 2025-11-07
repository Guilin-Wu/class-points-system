
document.addEventListener('DOMContentLoaded', () => {

    const App = {
        turntableInstance: null,
        currentSpinnerId: null,

        state: {
            students: [],
            groups: [],
            rewards: [],
            records: [],
            sortState: { column: 'id', direction: 'asc' },
            leaderboardType: 'realtime',
            turntablePrizes: [],
            turntableCost: 10,
            dashboardSortState: { column: 'points', direction: 'desc' },
            groupLeaderboardType: 'avg',
        },

        DOMElements: {
            // ... (您的 DOM 元素列表保持不变)
            statStudentCount: document.getElementById('stat-student-count'), statGroupCount: document.getElementById('stat-group-count'), statTotalPoints: document.getElementById('stat-total-points'), statAvgPoints: document.getElementById('stat-avg-points'), navItems: document.querySelectorAll('.nav-item'), views: document.querySelectorAll('#main-content > div'), studentCardsContainer: document.getElementById('student-cards-container'), studentTableBody: document.querySelector('#student-table tbody'), studentTableHeader: document.querySelector('#student-table thead'), groupTableBody: document.querySelector('#group-table tbody'), recordTableBody: document.querySelector('#record-table tbody'), rewardsContainer: document.getElementById('rewards-container'), leaderboardList: document.getElementById('leaderboard-list'), leaderboardTitle: document.getElementById('leaderboard-title'), leaderboardToggle: document.querySelector('.leaderboard-toggle'), studentModal: document.getElementById('student-modal'), studentForm: document.getElementById('student-form'), studentModalTitle: document.getElementById('student-modal-title'), studentIdInput: document.getElementById('student-id'), studentIdDisplayInput: document.getElementById('student-id-display'), studentNameInput: document.getElementById('student-name'), studentGroupSelect: document.getElementById('student-group'), groupModal: document.getElementById('group-modal'), groupForm: document.getElementById('group-form'), groupIdInput: document.getElementById('group-id'), groupNameInput: document.getElementById('group-name'), rewardModal: document.getElementById('reward-modal'), rewardForm: document.getElementById('reward-form'), rewardModalTitle: document.getElementById('reward-modal-title'), rewardIdInput: document.getElementById('reward-id'), rewardNameInput: document.getElementById('reward-name'), rewardCostInput: document.getElementById('reward-cost'), redeemModal: document.getElementById('redeem-modal'), redeemForm: document.getElementById('redeem-form'), redeemRewardIdInput: document.getElementById('redeem-reward-id'), redeemRewardName: document.getElementById('redeem-reward-name'), redeemRewardCost: document.getElementById('redeem-reward-cost'), redeemStudentSelect: document.getElementById('redeem-student-select'), groupPointsModal: document.getElementById('group-points-modal'), groupPointsForm: document.getElementById('group-points-form'), groupPointsSelect: document.getElementById('group-points-select'), groupPointsAmount: document.getElementById('group-points-amount'), groupPointsReason: document.getElementById('group-points-reason'), pointsModal: document.getElementById('points-modal'), pointsForm: document.getElementById('points-form'), pointsStudentName: document.getElementById('points-student-name'), pointsStudentIdInput: document.getElementById('points-student-id-input'), pointsChangeAmount: document.getElementById('points-change-amount'), pointsChangeReason: document.getElementById('points-change-reason'),
            allPointsModal: document.getElementById('all-points-modal'), allPointsForm: document.getElementById('all-points-form'), allPointsAmount: document.getElementById('all-points-amount'), allPointsReason: document.getElementById('all-points-reason'),
            searchInput: document.getElementById('search-input'), importFileInput: document.getElementById('import-file-input'),
            turntableCanvas: document.getElementById('turntable-canvas'), turntableCostInput: document.getElementById('turntable-cost-input'),
            turntablePrizeTableBody: document.querySelector('#turntable-prize-table tbody'), turntablePrizeModal: document.getElementById('turntable-prize-modal'),
            turntablePrizeForm: document.getElementById('turntable-prize-form'), turntablePrizeModalTitle: document.getElementById('turntable-prize-modal-title'),
            turntablePrizeIdInput: document.getElementById('turntable-prize-id'), turntablePrizeNameInput: document.getElementById('turntable-prize-name'),
            spinSelectModal: document.getElementById('spin-select-modal'), spinSelectForm: document.getElementById('spin-select-form'),
            spinCostDisplay: document.getElementById('spin-cost-display'), spinStudentSelect: document.getElementById('spin-student-select'),
            // 新增UI元素
            notificationContainer: document.getElementById('notification-container'),
            confirmModal: document.getElementById('confirm-modal'),
            confirmModalText: document.getElementById('confirm-modal-text'),
            confirmOkBtn: document.getElementById('confirm-ok-btn'),
            confirmCancelBtn: document.getElementById('confirm-cancel-btn'),
            confirmCloseBtn: document.getElementById('confirm-close-btn'),

            individualRecordModal: document.getElementById('individual-record-modal'),
            individualRecordModalTitle: document.getElementById('individual-record-modal-title'),
            individualRecordTableBody: document.getElementById('individual-record-table-body'),
            bulkGroupModal: document.getElementById('bulk-group-modal'),
            bulkGroupForm: document.getElementById('bulk-group-form'),
            bulkGroupModalTitle: document.getElementById('bulk-group-modal-title'),
            bulkGroupName: document.getElementById('bulk-group-name'),
            bulkGroupIdInput: document.getElementById('bulk-group-id'),
            unassignedStudentsList: document.getElementById('unassigned-students-list'),
            assignedStudentsList: document.getElementById('assigned-students-list'),

            dashboardSortControls: document.querySelector('.sort-controls'),

            printStudentSelect: document.getElementById('print-student-select'),
            btnPrintSummary: document.getElementById('btn-print-summary'),
            btnPrintDetails: document.getElementById('btn-print-details'),


            studentPointsModal: document.getElementById('student-points-modal'),
            studentPointsForm: document.getElementById('student-points-form'),
            studentPointsCheckboxContainer: document.getElementById('student-points-checkbox-container'),
            studentPointsAmount: document.getElementById('student-points-amount'),
            studentPointsReason: document.getElementById('student-points-reason'),


            pasteImportModal: document.getElementById('paste-import-modal'),
            pasteImportForm: document.getElementById('paste-import-form'),
            pasteStudentNames: document.getElementById('paste-student-names'),


            // 新增：导出选择模态框的元素
            exportChoiceModal: document.getElementById('export-choice-modal'),
            btnExportChoiceJson: document.getElementById('btn-export-choice-json'),
            btnExportChoiceExcel: document.getElementById('btn-export-choice-excel'),

            quickReasonModal: document.getElementById('quick-reason-modal'),
            quickReasonForm: document.getElementById('quick-reason-form'),
            quickReasonIdInput: document.getElementById('quick-reason-id'),
            quickReasonTextInput: document.getElementById('quick-reason-text'),
            quickReasonPointsInput: document.getElementById('quick-reason-points'),
            quickReasonTableBody: document.getElementById('quick-reason-table-body'),
            btnCancelQuickReasonEdit: document.getElementById('btn-cancel-quick-reason-edit'),


            groupLeaderboardList: document.getElementById('group-leaderboard-list'),
            groupLeaderboardToggle: document.getElementById('group-leaderboard-toggle'),

            btnOpenQuickReasonModal: document.getElementById('btn-open-quick-reason-modal'),

            btnOpenAchievementModal: document.getElementById('btn-open-achievement-modal'),
            achievementModal: document.getElementById('achievement-modal'),
            achievementForm: document.getElementById('achievement-form'),
            achievementIdInput: document.getElementById('achievement-id'),
            achievementNameInput: document.getElementById('achievement-name-text'),
            achievementPointsInput: document.getElementById('achievement-points'),
            achievementTableBody: document.getElementById('achievement-table-body'),
            btnCancelAchievementEdit: document.getElementById('btn-cancel-achievement-edit'),

            clearDataModal: document.getElementById('clear-data-modal'),
            btnClearPointsOnly: document.getElementById('btn-clear-points-only'),
            btnClearSettings: document.getElementById('btn-clear-settings'),
            btnClearAll: document.getElementById('btn-clear-all'),

        },


        helpers: {
            getAchievement(totalEarnedPoints) {
                // 1. 获取所有称号，按所需积分降序排列
                const sortedTiers = [...App.state.achievementTiers].sort((a, b) => b.points - b.points);

                // 2. 找到学生达到的最高称号
                const achievedTier = sortedTiers.find(tier => totalEarnedPoints >= tier.points);

                if (!achievedTier) return null; // 未达到任何称号

                // 3. 返回称号名称和它在数据库中存储的 level
                //    (achievedTier.level 已经在 loadData 中被保证存在)
                return {
                    title: achievedTier.name,
                    level: achievedTier.level
                };
            }
        },

        init() {
            App.loadData();
            if (!App.state.dashboardSortState) {
                App.state.dashboardSortState = { column: 'points', direction: 'desc' };
            }
            App.setupEventListeners();
            App.render();
        },



        // --- 新增：UI 工具函数 ---
        ui: {
            showNotification(message, type = 'success') {
                const notif = document.createElement('div');
                notif.className = `notification ${type}`;
                notif.textContent = message;
                App.DOMElements.notificationContainer.appendChild(notif);
                setTimeout(() => {
                    notif.classList.add('fade-out');
                    notif.addEventListener('animationend', () => notif.remove());
                }, 3000);
            },
            showConfirm(message, onConfirm) {
                const { confirmModal, confirmModalText, confirmOkBtn, confirmCancelBtn, confirmCloseBtn } = App.DOMElements;
                confirmModalText.textContent = message;
                confirmModal.classList.add('active');

                // 使用 .cloneNode(true) 移除旧的事件监听器
                const newOkBtn = confirmOkBtn.cloneNode(true);
                confirmOkBtn.parentNode.replaceChild(newOkBtn, confirmOkBtn);
                App.DOMElements.confirmOkBtn = newOkBtn; // 更新DOM缓存

                const closeModal = () => confirmModal.classList.remove('active');

                newOkBtn.onclick = () => {
                    closeModal();
                    onConfirm();
                };
                confirmCancelBtn.onclick = closeModal;
                confirmCloseBtn.onclick = closeModal;
            },
            openModal(modalElement) {
                modalElement.classList.add('active');
            },
            closeModal(modalElement) {
                modalElement.classList.remove('active');
            }
        },

        // --- 重构：Actions ---
        // action 只负责业务逻辑和数据修改，返回 {success, message}
        actions: {
            generateId: () => '_' + Math.random().toString(36).substr(2, 9),
            addStudent(id, name, group) { // <-- 变化1：增加 id 参数
                App.state.students.push({ id: id, name, group, points: 0, totalEarnedPoints: 0, totalDeductions: 0 }); // <-- 变化2：使用传入的 id
                App.saveData();
                return { success: true };
            },
            updateStudent(originalId, newId, name, group) {
                // 检查新的ID是否与系统中其他学生冲突
                if (originalId !== newId && App.state.students.some(s => s.id === newId)) {
                    return { success: false, message: '错误：新的学生ID "' + newId + '" 已被占用！' };
                }

                const student = App.state.students.find(s => s.id === originalId);
                if (student) {
                    // 更新学生信息
                    student.id = newId;
                    student.name = name;
                    student.group = group;

                    // 关键一步：同步更新所有相关积分记录中的学生ID
                    App.state.records.forEach(r => {
                        if (r.studentId === originalId) {
                            r.studentId = newId;
                        }
                    });

                    App.saveData();
                    return { success: true };
                }
                return { success: false, message: '未找到该学生' };
            },
            deleteStudent(id) {
                App.state.students = App.state.students.filter(s => s.id !== id);
                App.saveData();
                return { success: true };
            },
            addGroup(name) {
                App.state.groups.push({ id: App.actions.generateId(), name });
                App.saveData();
                return { success: true };
            },
            updateGroup(id, name) {
                const group = App.state.groups.find(g => g.id === id);
                if (group) {
                    group.name = name;
                    App.saveData();
                    return { success: true };
                }
                return { success: false, message: '未找到该小组' };
            },
            deleteGroup(id) {
                App.state.students.forEach(s => { if (s.group === id) s.group = ''; });
                App.state.groups = App.state.groups.filter(g => g.id !== id);
                App.saveData();
                return { success: true };
            },
            // 在 script.js 中，找到并替换 App.actions.changePoints 函数
            // ... 在 App.actions 对象内 ...
            // 在 App.actions 对象内，找到并替换 changePoints 函数
            changePoints(studentId, delta, reason) {
                const student = App.state.students.find(s => s.id === studentId);
                if (!student) return { success: false, message: '未找到该学生' };

                // --- 逻辑变更开始 ---

                // 1. 获取旧的【累计积分】用于对比
                const oldTotalEarned = student.totalEarnedPoints || 0;
                const oldAchievement = App.helpers.getAchievement(oldTotalEarned);

                // 2. 更新所有积分（实时积分 和 累计/扣分积分）
                student.points += delta;

                if (delta > 0) {
                    student.totalEarnedPoints = (student.totalEarnedPoints || 0) + delta;
                }
                if (delta < 0 && !reason.includes('兑换') && !reason.includes('抽奖')) {
                    student.totalDeductions = (student.totalDeductions || 0) + Math.abs(delta);
                }

                // 3. 基于更新后的【累计积分】判断是否晋升
                const newAchievement = App.helpers.getAchievement(student.totalEarnedPoints);
                if (newAchievement && (!oldAchievement || newAchievement.title !== oldAchievement.title)) {
                    student.justLeveledUp = true; // 设置“刚刚晋升”的标志
                    console.log(`${student.name} 晋升为 ${newAchievement.title}! (基于累计积分)`);
                }

                // --- 逻辑变更结束 ---

                // 添加记录（这部分逻辑不变）
                App.state.records.push({
                    time: new Date().toLocaleString(),
                    studentId: student.id,
                    studentName: student.name,
                    change: delta > 0 ? `+${delta}` : delta,
                    reason: reason,
                    finalPoints: student.points
                });

                App.saveData();
                return { success: true };
            },

            bulkUpdateGroupMembers(groupId, newMemberIds) {
                // 1. 将该小组所有现有成员的小组ID清空
                App.state.students.forEach(student => {
                    if (student.group === groupId) {
                        student.group = '';
                    }
                });

                // 2. 为所有新成员设置新的小组ID
                newMemberIds.forEach(studentId => {
                    const student = App.state.students.find(s => s.id === studentId);
                    if (student) {
                        student.group = groupId;
                    }
                });

                App.saveData();
                return { success: true };
            },

            redeemReward(studentId, rewardId) {
                const student = App.state.students.find(s => s.id === studentId);
                const reward = App.state.rewards.find(r => r.id === rewardId);

                if (!student || !reward) return { success: false, message: '无法找到学生或奖品信息！' };
                if (student.points < reward.cost) return { success: false, message: `${student.name} 的积分不足以兑换 ${reward.name}！` };

                return App.actions.changePoints(studentId, -reward.cost, `兑换: ${reward.name}`);
            },
            addGroupPoints(groupId, pointsDelta, reason) {
                const studentsInGroup = App.state.students.filter(s => s.group === groupId);
                if (studentsInGroup.length === 0) return { success: false, message: '该小组没有成员！' };

                studentsInGroup.forEach(s => App.actions.changePoints(s.id, pointsDelta, reason));
                return { success: true };
            },
            addAllPoints(pointsDelta, reason) {
                if (App.state.students.length === 0) return { success: false, message: '班级中没有学生！' };

                App.state.students.forEach(s => App.actions.changePoints(s.id, pointsDelta, reason));
                return { success: true };
            },

            clearAllData() {
                // 彻底清除 localStorage 中的数据
                localStorage.removeItem('classPointsData');
                // 返回一个带 reload 标志的消息
                return { success: true, message: '所有数据已清空。页面将重新加载并恢复为演示数据。', reload: true };
            },

            // --- ⬇️ 新增：选项1 (只清积分) ⬇️ ---
            clearPointsAndRecords() {
                App.state.students.forEach(s => {
                    s.points = 0;
                    s.totalEarnedPoints = 0;
                    s.totalDeductions = 0;
                    if (s.justLeveledUp) delete s.justLeveledUp;
                });
                App.state.records = [];
                App.saveData();
                return { success: true, message: '已清除所有积分和记录。' };
            },

            // --- ⬇️ 新增：选项2 (清积分+设置) ⬇️ ---
            clearSettingsAndRecords() {
                // 1. 先调用选项1，清除所有积分
                App.actions.clearPointsAndRecords();

                // 2. 清除所有设置，重置为默认值 (基于 loadData)
                App.state.rewards = [];
                App.state.turntablePrizes = [];
                App.state.turntableCost = 10;

                App.state.quickReasons = [
                    { id: 'qr_1', text: '积极回答', points: 5 },
                    { id: 'qr_2', text: '优秀作业', points: 10 },
                    { id: 'qr_3', text: '帮助同学', points: 3 },
                    { id: 'qr_4', text: '上课迟到', points: -1 },
                    { id: 'qr_5', text: '未交作业', points: -5 }
                ];
                App.state.achievementTiers = [
                    { id: App.actions.generateId(), name: '积分新秀', points: 50, level: 1 },
                    { id: App.actions.generateId(), name: '积分达人', points: 100, level: 2 },
                    { id: App.actions.generateId(), name: '积分大师', points: 200, level: 3 },
                    { id: App.actions.generateId(), name: '积分王者', points: 500, level: 4 },
                    { id: App.actions.generateId(), name: '精英', points: 800, level: 5 },
                    { id: App.actions.generateId(), name: '白银', points: 1200, level: 6 },
                    { id: App.actions.generateId(), name: '史诗', points: 1700, level: 7 },
                    { id: App.actions.generateId(), name: '英雄', points: 2500, level: 8 },
                    { id: App.actions.generateId(), name: '传奇', points: 4000, level: 9 },
                    { id: App.actions.generateId(), name: '战神', points: 5000, level: 10 }
                ];

                // 3. 重置排序和视图状态
                App.state.sortState = { column: 'id', direction: 'asc' };
                App.state.leaderboardType = 'realtime';
                App.state.dashboardSortState = { column: 'points', direction: 'desc' };
                App.state.groupLeaderboardType = 'avg';

                // state.students 和 state.groups 被保留

                App.saveData();
                return { success: true, message: '已清除所有设置和积分。学生/小组信息已保留。' };
            },


            addReward(n, c) { App.state.rewards.push({ id: App.actions.generateId(), name: n, cost: parseInt(c) }); App.saveData(); return { success: true }; },
            updateReward(i, n, c) { const r = App.state.rewards.find(r => r.id === i); if (r) { r.name = n; r.cost = parseInt(c); App.saveData(); } return { success: true }; },
            deleteReward(i) { App.state.rewards = App.state.rewards.filter(r => r.id !== i); App.saveData(); return { success: true }; },
            addTurntablePrize(name) { App.state.turntablePrizes.push({ id: App.actions.generateId(), text: name }); App.saveData(); return { success: true }; },
            updateTurntablePrize(id, name) { const prize = App.state.turntablePrizes.find(p => p.id === id); if (prize) { prize.text = name; App.saveData(); } return { success: true }; },
            deleteTurntablePrize(id) { App.state.turntablePrizes = App.state.turntablePrizes.filter(p => p.id !== id); App.saveData(); return { success: true }; },


            addStudentsBatch(names) {
                if (!names || names.length === 0) {
                    return { success: false, message: '学生名单为空。', added: 0, skipped: 0 };
                }

                // --- 智能ID生成逻辑 ---
                const existingIds = new Set(App.state.students.map(s => s.id));
                let maxNum = 0;
                let prefix = 'S'; // 默认前缀
                App.state.students.forEach(s => {
                    const match = s.id.match(/^([a-zA-Z]*)(\d+)$/);
                    if (match) {
                        prefix = match[1] || prefix;
                        const num = parseInt(match[2], 10);
                        if (num > maxNum) maxNum = num;
                    }
                });

                const existingNames = new Set(App.state.students.map(s => s.name.trim()));
                // 过滤掉粘贴内容中的空行和重复姓名
                const uniqueNewNames = [...new Set(names.map(n => n.trim()).filter(Boolean))];

                let addedCount = 0;
                let skippedCount = 0;

                uniqueNewNames.forEach(name => {
                    if (existingNames.has(name)) {
                        skippedCount++;
                    } else {
                        maxNum++;
                        let newId = `${prefix}${maxNum}`;
                        // 循环检查，确保新ID绝对不会重复
                        while (existingIds.has(newId)) {
                            maxNum++;
                            newId = `${prefix}${maxNum}`;
                        }
                        // 直接修改 state，比调用 action 更高效
                        App.state.students.push({ id: newId, name, group: '', points: 0, totalEarnedPoints: 0, totalDeductions: 0 });
                        existingIds.add(newId);
                        existingNames.add(name);
                        addedCount++;
                    }
                });

                // 所有学生添加完毕后，只保存一次数据
                App.saveData();

                return { success: true, added: addedCount, skipped: skippedCount };
            },


            undoRecord(recordIndex) {
                const records = App.state.records;
                if (recordIndex < 0 || recordIndex >= records.length) {
                    return { success: false, message: '记录不存在！' };
                }

                const recordToUndo = records[recordIndex];
                if (recordToUndo.undone) {
                    return { success: false, message: '此记录已被撤回，无法重复操作。' };
                }

                const student = App.state.students.find(s => s.id === recordToUndo.studentId);
                if (!student) {
                    return { success: false, message: '无法找到该记录对应的学生。' };
                }

                // --- ↓↓↓ 核心修正逻辑开始 ↓↓↓ ---

                // 1. 获取原始分值和反向分值
                const originalChange = parseInt(recordToUndo.change);
                const pointsReversal = originalChange * -1;

                // 2. 更新学生的【实时积分】
                student.points += pointsReversal;

                // 3. 根据原始操作的类型，精确修正【累计积分】或【扣分积分】
                if (originalChange > 0) {
                    // 如果原始操作是“加分”，则在“累计积分”中减去相应的值
                    student.totalEarnedPoints = (student.totalEarnedPoints || 0) - originalChange;
                } else if (originalChange < 0) {
                    // 如果原始操作是“扣分”，需判断它当初是否被计入了“扣分积分”
                    const originalReason = recordToUndo.reason || '';
                    if (!originalReason.includes('兑换') && !originalReason.includes('抽奖')) {
                        // 只有非消耗性的扣分才会被计入，因此撤回时也只减去这部分
                        student.totalDeductions = (student.totalDeductions || 0) - Math.abs(originalChange);
                    }
                }

                // 4. 将原始记录标记为“已撤回”
                recordToUndo.undone = true;

                // 5. 为本次“撤回”操作本身创建一条新的日志，用于追溯
                App.state.records.push({
                    time: new Date().toLocaleString(),
                    studentId: student.id,
                    studentName: student.name,
                    change: pointsReversal > 0 ? `+${pointsReversal}` : pointsReversal,
                    reason: `撤销操作 (原由: ${recordToUndo.reason})`,
                    finalPoints: student.points
                });

                // --- 核心修正逻辑结束 ---

                App.saveData();
                return { success: true };
            },
            addQuickReason(text, points) {
                if (!text || !points) return { success: false, message: '文本和分值不能为空' };
                const newReason = {
                    id: App.actions.generateId(), // 复用已有的ID生成器
                    text: text,
                    points: parseInt(points)
                };
                App.state.quickReasons.push(newReason);
                App.saveData();
                return { success: true };
            },

            updateQuickReason(id, text, points) {
                if (!text || !points) return { success: false, message: '文本和分值不能为空' };
                const reason = App.state.quickReasons.find(r => r.id === id);
                if (reason) {
                    reason.text = text;
                    reason.points = parseInt(points);
                    App.saveData();
                    return { success: true };
                }
                return { success: false, message: '未找到该理由' };
            },

            deleteQuickReason(id) {
                App.state.quickReasons = App.state.quickReasons.filter(r => r.id !== id);
                App.saveData();
                return { success: true };
            },

            addAchievementTier(name, points) {
                if (!name || !points) return { success: false, message: '名称和所需积分不能为空' };

                // 找到当前最大的 level
                const maxLevel = App.state.achievementTiers.length > 0
                    ? Math.max(...App.state.achievementTiers.map(t => t.level))
                    : 0;

                const newTier = {
                    id: App.actions.generateId(),
                    name: name,
                    points: parseInt(points),
                    level: maxLevel + 1 // 自动成为最高等级
                };
                App.state.achievementTiers.push(newTier);
                App.saveData();
                return { success: true };
            },

            updateAchievementTier(id, name, points) {
                if (!name || !points) return { success: false, message: '名称和所需积分不能为空' };
                const tier = App.state.achievementTiers.find(t => t.id === id);
                if (tier) {
                    tier.name = name;
                    tier.points = parseInt(points);
                    App.saveData();
                    return { success: true };
                }
                return { success: false, message: '未找到该称号' };
            },

            deleteAchievementTier(id) {
                const tierToDelete = App.state.achievementTiers.find(t => t.id === id);
                if (!tierToDelete) return { success: false, message: '未找到' };

                const deletedLevel = tierToDelete.level;

                // 1. 过滤掉要删除的
                App.state.achievementTiers = App.state.achievementTiers.filter(t => t.id !== id);

                // 2. 将所有更高级别的 level 减 1，填补空缺
                App.state.achievementTiers
                    .filter(t => t.level > deletedLevel)
                    .forEach(t => {
                        t.level -= 1;
                    });

                App.saveData();
                return { success: true };
            },

            moveAchievement(id, direction) {
                // 必须先按 level 排序才能正确找到邻居
                const tiers = App.state.achievementTiers.sort((a, b) => a.level - b.level);
                const tierIndex = tiers.findIndex(t => t.id === id);

                if (tierIndex === -1) return { success: false };

                if (direction === 'up' && tierIndex > 0) {
                    // 不是第一个，可以上移
                    const tierToMove = tiers[tierIndex];
                    const tierToSwap = tiers[tierIndex - 1]; // 它上面的邻居

                    // 交换 level
                    tierToMove.level -= 1;
                    tierToSwap.level += 1;

                } else if (direction === 'down' && tierIndex < tiers.length - 1) {
                    // 不是最后一个，可以下移
                    const tierToMove = tiers[tierIndex];
                    const tierToSwap = tiers[tierIndex + 1]; // 它下面的邻居

                    // 交换 level
                    tierToMove.level += 1;
                    tierToSwap.level -= 1;
                } else {
                    return { success: false }; // 已经在顶部或底部
                }

                App.saveData();
                return { success: true };
            },
        },

        // ... (render, saveData, loadData, import/export 函数保持不变)
        render() { App.render.stats(); App.render.dashboard(); App.render.leaderboard(); App.render.studentTable(); App.render.sortIndicators(); App.render.groupTable(); App.render.groupLeaderboard(); App.render.rewards(); App.render.records(); App.render.turntablePrizes(); App.render.dashboardSortIndicators(); },
        saveData() { localStorage.setItem('classPointsData', JSON.stringify(App.state)); },
        loadData() {
            const d = localStorage.getItem('classPointsData'); const s = {
                students: [], groups: [], rewards: [], records: [], sortState: { column: 'id', direction: 'asc' }, leaderboardType: 'realtime', turntablePrizes: [], turntableCost: 10, quickReasons: [
                    { id: 'qr_1', text: '积极回答', points: 5 },
                    { id: 'qr_2', text: '优秀作业', points: 10 },
                    { id: 'qr_3', text: '帮助同学', points: 3 },
                    { id: 'qr_4', text: '上课迟到', points: -1 },
                    { id: 'qr_5', text: '未交作业', points: -5 }],
                // --- ⬇️ 新增 ⬇️ ---
                achievementTiers: [],
                // --- ⬆️ 新增 ⬆️ ---
            }; if (d) {
                const l = JSON.parse(d); if (l.students) { l.students.forEach(st => { if (st.totalEarnedPoints === undefined) st.totalEarnedPoints = st.points > 0 ? st.points : 0; if (st.totalDeductions === undefined) st.totalDeductions = 0; }); } App.state = { ...s, ...l };

                // --- ⬇️ 新增：自动为旧数据打上 level 补丁 ⬇️ ---
                if (App.state.achievementTiers && App.state.achievementTiers.length > 0) {
                    const needsPatch = App.state.achievementTiers.some(t => t.level === undefined);
                    if (needsPatch) {
                        console.log("正在为成就数据添加 'level' 补丁...");
                        // 按照旧的“按积分排序”逻辑来分配初始等级
                        App.state.achievementTiers.sort((a, b) => a.points - b.points);
                        App.state.achievementTiers.forEach((tier, index) => {
                            tier.level = index + 1;
                        });
                        App.saveData(); // 保存补丁
                    }
                }
                // --- ⬆️ 补丁结束 ⬆️ ---

            } else {
                App.state = s; let sG1 = App.actions.generateId(); let sG2 = App.actions.generateId(); App.state.groups = [{ id: sG1, name: '第一小组' }, { id: sG2, name: '第二小组' }]; App.state.students = [{ id: 'S01', name: '张三', group: sG1, points: 100, totalEarnedPoints: 100, totalDeductions: 0 }, { id: 'S02', name: '李四', group: sG2, points: 80, totalEarnedPoints: 80, totalDeductions: 0 }]; App.state.rewards = [{ id: App.actions.generateId(), name: '免作业一次', cost: 50 }, { id: App.actions.generateId(), name: '小零食', cost: 20 }];

                // --- ⬇️ 修正：为默认称号添加 'level' 属性 ⬇️ ---
                App.state.achievementTiers = [
                    { id: App.actions.generateId(), name: '积分新秀', points: 50, level: 1 },
                    { id: App.actions.generateId(), name: '积分达人', points: 100, level: 2 },
                    { id: App.actions.generateId(), name: '积分大师', points: 200, level: 3 },
                    { id: App.actions.generateId(), name: '积分王者', points: 500, level: 4 },
                    { id: App.actions.generateId(), name: '精英', points: 800, level: 5 },
                    { id: App.actions.generateId(), name: '白银', points: 1200, level: 6 },
                    { id: App.actions.generateId(), name: '史诗', points: 1700, level: 7 },
                    { id: App.actions.generateId(), name: '英雄', points: 2500, level: 8 },
                    { id: App.actions.generateId(), name: '传奇', points: 4000, level: 9 },
                    { id: App.actions.generateId(), name: '战神', points: 5000, level: 10 }
                ];
                // --- ⬆️ 修正结束 ⬆️ ---
                App.saveData();
            }
        },

        // 将旧的 exportData 函数替换为这两个
        exportDataJSON: () => {
            const d = JSON.stringify(App.state, null, 2);
            const b = new Blob([d], { type: 'application/json' });
            const u = URL.createObjectURL(b);
            const a = document.createElement('a');
            a.href = u;
            a.download = `class_data_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(u);
        },

        exportDataExcel: () => {
            const studentsForExport = App.state.students.map(s => {
                const group = App.state.groups.find(g => g.id === s.group);
                return {
                    id: s.id,
                    name: s.name,
                    group: s.group, // 保留group id用于精确导入
                    groupName: group ? group.name : '未分组', // 额外提供小组名称方便查看
                    points: s.points,
                    totalEarnedPoints: s.totalEarnedPoints || 0,
                    totalDeductions: s.totalDeductions || 0
                };
            });

            const worksheet = XLSX.utils.json_to_sheet(studentsForExport);

            // 设置列宽以优化可读性
            worksheet['!cols'] = [
                { wch: 15 }, // id
                { wch: 15 }, // name
                { wch: 20 }, // group (ID)
                { wch: 15 }, // groupName
                { wch: 10 }, // points
                { wch: 15 }, // totalEarnedPoints
                { wch: 15 }  // totalDeductions
            ];

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

            XLSX.writeFile(workbook, `class_students_data_${new Date().toISOString().slice(0, 10)}.xlsx`);
        },

        importData: (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            const fileName = file.name.toLowerCase();

            if (fileName.endsWith('.json')) {
                // --- 处理 JSON 文件 (逻辑保持不变) ---
                reader.onload = (event) => {
                    try {
                        const d = JSON.parse(event.target.result);
                        const ds = { students: [], groups: [], rewards: [], records: [], sortState: { column: 'id', direction: 'asc' }, leaderboardType: 'realtime', turntablePrizes: [], turntableCost: 10 };
                        let s = false;
                        if (d.students && d.groups) {
                            if (d.students) {
                                d.students.forEach(student => {
                                    if (student.totalEarnedPoints === undefined) {
                                        student.totalEarnedPoints = student.points > 0 ? student.points : 0;
                                    }
                                });
                            }
                            App.state = { ...ds, ...d };
                            s = true;
                        }
                        if (s) {
                            App.saveData();
                            App.render();
                            App.ui.showNotification('JSON数据导入成功！');
                        } else {
                            App.ui.showNotification('导入失败：JSON文件格式不正确。', 'error');
                        }
                    } catch (err) {
                        console.error("JSON Import Error:", err);
                        App.ui.showNotification('导入失败：文件解析错误。', 'error');
                    }
                };
                reader.readAsText(file);
            } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                // --- 处理 Excel 文件 (已更新逻辑) ---
                reader.onload = (event) => {
                    try {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const excelData = XLSX.utils.sheet_to_json(worksheet);

                        if (!excelData) {
                            App.ui.showNotification('导入失败：Excel文件为空或格式错误。', 'error');
                            return;
                        }

                        // --- 核心修改开始 ---
                        const newStudents = [];
                        const groupsMap = new Map(); // 使用Map来存储和去重小组信息

                        // 1. 遍历Excel数据，同时提取学生和小组信息
                        excelData.forEach(row => {
                            // 只处理包含有效姓名的行
                            if (row.name && String(row.name).trim() !== '') {
                                newStudents.push({
                                    id: String(row.id || App.actions.generateId()),
                                    name: String(row.name).trim(),
                                    group: String(row.group || ''),
                                    points: parseInt(row.points || 0),
                                    totalEarnedPoints: parseInt(row.totalEarnedPoints || row.points || 0),
                                    totalDeductions: parseInt(row.totalDeductions || 0)
                                });
                            }

                            // 如果行中有小组ID和小组名，则更新到Map中
                            // 这会覆盖旧的名称，实现“更新”效果
                            if (row.group && row.groupName) {
                                groupsMap.set(String(row.group), String(row.groupName));
                            }
                        });

                        // 2. 将Map转换回小组数组格式
                        const newGroups = [];
                        groupsMap.forEach((name, id) => {
                            newGroups.push({ id, name });
                        });

                        // 3. 同时更新学生和小组列表
                        App.state.students = newStudents;
                        App.state.groups = newGroups;
                        // --- 核心修改结束 ---

                        App.saveData();
                        App.render();

                        App.ui.showNotification(`成功从Excel导入 ${newStudents.length} 名学生和 ${newGroups.length} 个小组的信息！`);

                    } catch (err) {
                        console.error("Excel Import Error:", err);
                        App.ui.showNotification('导入失败：Excel文件解析错误。', 'error');
                    }
                };
                reader.readAsArrayBuffer(file);
            } else {
                App.ui.showNotification('不支持的文件格式！请选择.json, .xlsx或.xls文件。', 'error');
            }

            e.target.value = '';
        },
        //importData: (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (event) => { try { const d = JSON.parse(event.target.result); const ds = { students: [], groups: [], rewards: [], records: [], sortState: { column: 'id', direction: 'asc' }, leaderboardType: 'realtime', turntablePrizes: [], turntableCost: 10 }; let s = false; if (Array.isArray(d)) { const nS = d.map(st => ({ id: String(st.id || st["id (学生ID)"]), name: st.name || st["name (姓名)"], group: st.group || st["group_id (小组ID)"] || "", points: parseInt(st.points || st["points (初始积分)"]) || 0, totalEarnedPoints: parseInt(st.points || st["points (初始积分)"]) || 0 })); App.state.students = nS; s = true; } else if (d.students && d.groups) { if (d.students) { d.students.forEach(student => { if (student.totalEarnedPoints === undefined) { student.totalEarnedPoints = student.points > 0 ? student.points : 0; } }); } App.state = { ...ds, ...d }; s = true; } if (s) { App.saveData(); App.render(); App.ui.showNotification('数据导入成功！'); } else { App.ui.showNotification('导入失败：文件格式不正确。', 'error'); } } catch (err) { console.error("Import Error:", err); App.ui.showNotification('导入失败：文件解析错误。', 'error'); } }; r.readAsText(f); e.target.value = ''; },

        setupEventListeners() {
            // 页面导航
            App.DOMElements.navItems.forEach(i => i.addEventListener('click', e => App.handlers.handleNavClick(e)));

            // 所有模态框的关闭按钮
            document.querySelectorAll('.modal .close-btn').forEach(b => b.addEventListener('click', e => App.ui.closeModal(e.target.closest('.modal'))));

            // 各个表单的提交事件
            App.DOMElements.studentForm.addEventListener('submit', e => App.handlers.handleStudentFormSubmit(e));
            App.DOMElements.groupForm.addEventListener('submit', e => App.handlers.handleGroupFormSubmit(e));
            App.DOMElements.rewardForm.addEventListener('submit', e => App.handlers.handleRewardFormSubmit(e));
            App.DOMElements.redeemForm.addEventListener('submit', e => App.handlers.handleRedeemFormSubmit(e));
            App.DOMElements.groupPointsForm.addEventListener('submit', e => App.handlers.handleGroupPointsFormSubmit(e));
            App.DOMElements.pointsForm.addEventListener('submit', e => App.handlers.handlePointsFormSubmit(e));
            App.DOMElements.allPointsForm.addEventListener('submit', e => App.handlers.handleAllPointsFormSubmit(e));

            App.DOMElements.pointsModal.addEventListener('click', e => App.handlers.handlePointsModalClick(e));
            App.DOMElements.groupPointsModal.addEventListener('click', e => App.handlers.handleBatchQuickReasonClick(e));
            App.DOMElements.studentPointsModal.addEventListener('click', e => App.handlers.handleBatchQuickReasonClick(e));
            App.DOMElements.allPointsModal.addEventListener('click', e => App.handlers.handleBatchQuickReasonClick(e));

            App.DOMElements.quickReasonForm.addEventListener('submit', e => App.handlers.handleQuickReasonFormSubmit(e));
            App.DOMElements.quickReasonTableBody.addEventListener('click', e => App.handlers.handleQuickReasonTableClick(e));
            App.DOMElements.btnCancelQuickReasonEdit.addEventListener('click', () => App.handlers.resetQuickReasonForm());
            // --- 新增结束 ---

            App.DOMElements.turntablePrizeForm.addEventListener('submit', e => App.handlers.handleTurntablePrizeFormSubmit(e));
            App.DOMElements.spinSelectForm.addEventListener('submit', e => App.handlers.handleSpinSelectFormSubmit(e));
            App.DOMElements.bulkGroupForm.addEventListener('submit', e => App.handlers.handleBulkGroupFormSubmit(e));
            App.DOMElements.pasteImportForm.addEventListener('submit', e => App.handlers.handlePasteImportSubmit(e));
            App.DOMElements.studentPointsForm.addEventListener('submit', e => App.handlers.handleStudentPointsFormSubmit(e));

            // 页面主要按钮的点击事件
            document.getElementById('btn-add-student').addEventListener('click', () => App.handlers.openStudentModal());
            document.getElementById('btn-add-group').addEventListener('click', () => App.handlers.openGroupModal());
            document.getElementById('btn-add-reward').addEventListener('click', () => App.handlers.openRewardModal());
            document.getElementById('btn-add-group-points').addEventListener('click', () => App.handlers.openGroupPointsModal());
            document.getElementById('btn-add-all-points').addEventListener('click', () => App.handlers.openAllPointsModal());
            document.getElementById('btn-add-turntable-prize').addEventListener('click', () => App.handlers.openTurntablePrizeModal());
            document.getElementById('btn-spin').addEventListener('click', () => App.handlers.openSpinSelectModal());
            document.getElementById('btn-add-student-points').addEventListener('click', () => App.handlers.openStudentPointsModal());
            document.getElementById('btn-open-quick-reason-modal').addEventListener('click', () => App.handlers.openQuickReasonModal());
            document.getElementById('btn-paste-import-students').addEventListener('click', () => App.handlers.openPasteImportModal());

            App.DOMElements.btnOpenAchievementModal.addEventListener('click', () => App.handlers.openAchievementModal());
            App.DOMElements.achievementForm.addEventListener('submit', e => App.handlers.handleAchievementFormSubmit(e));
            App.DOMElements.achievementTableBody.addEventListener('click', e => App.handlers.handleAchievementTableClick(e));
            App.DOMElements.btnCancelAchievementEdit.addEventListener('click', () => App.handlers.resetAchievementForm());


            // --- 以下是修正后的导出/导入逻辑 ---

            // 1. “导出数据”按钮只负责打开选择模态框
            document.getElementById('btn-export-data').addEventListener('click', () => {
                App.ui.openModal(App.DOMElements.exportChoiceModal);
            });

            // 2. 模态框内的“导出JSON”按钮负责执行JSON导出并关闭模态框
            App.DOMElements.btnExportChoiceJson.addEventListener('click', () => {
                App.exportDataJSON();
                App.ui.closeModal(App.DOMElements.exportChoiceModal);
            });

            // 3. 模态框内的“导出Excel”按钮负责执行Excel导出并关闭模态框
            App.DOMElements.btnExportChoiceExcel.addEventListener('click', () => {
                App.exportDataExcel();
                App.ui.closeModal(App.DOMElements.exportChoiceModal);
            });


            document.getElementById('btn-import-data').addEventListener('click', () => App.DOMElements.importFileInput.click());
            App.DOMElements.importFileInput.addEventListener('change', e => App.importData(e));

            // 1. “清除数据”按钮现在打开新模态框
            document.getElementById('btn-clear-data').addEventListener('click', () => {
                App.ui.openModal(App.DOMElements.clearDataModal);
            });

            // 2. 监听新模态框的三个按钮
            App.DOMElements.btnClearPointsOnly.addEventListener('click', () => {
                App.ui.closeModal(App.DOMElements.clearDataModal);
                App.ui.showConfirm('确认【仅清除所有积分和记录】吗？学生和设置将保留。', () => {
                    const result = App.actions.clearPointsAndRecords();
                    App.render();
                    App.ui.showNotification(result.message);
                });
            });

            App.DOMElements.btnClearSettings.addEventListener('click', () => {
                App.ui.closeModal(App.DOMElements.clearDataModal);
                App.ui.showConfirm('确认【清除所有设置和积分】吗？学生和小组名单将保留。', () => {
                    const result = App.actions.clearSettingsAndRecords();
                    App.render();
                    App.ui.showNotification(result.message);
                });
            });

            App.DOMElements.btnClearAll.addEventListener('click', () => {
                App.ui.closeModal(App.DOMElements.clearDataModal);
                App.ui.showConfirm('【最终警告】确认【清除所有数据】吗？此操作不可撤销！', () => {
                    const result = App.actions.clearAllData();
                    App.ui.showNotification(result.message, 'success');
                    // 稍作延迟后刷新页面
                    if (result.reload) {
                        setTimeout(() => window.location.reload(), 1500);
                    }
                });
            });
            // --- 其他监听器 ---
            App.DOMElements.searchInput.addEventListener('input', e => App.render.dashboard(e.target.value));
            App.DOMElements.dashboardSortControls.addEventListener('click', e => App.handlers.handleDashboardSortClick(e));
            App.DOMElements.turntableCostInput.addEventListener('change', e => { App.state.turntableCost = parseInt(e.target.value) || 0; App.saveData(); });
            App.DOMElements.studentCardsContainer.addEventListener('click', e => App.handlers.handleCardClick(e));
            App.DOMElements.rewardsContainer.addEventListener('click', e => App.handlers.handleRewardCardClick(e));
            App.DOMElements.studentTableBody.addEventListener('click', e => App.handlers.handleStudentTableClick(e));
            App.DOMElements.studentTableHeader.addEventListener('click', e => App.handlers.handleSortClick(e));
            App.DOMElements.groupTableBody.addEventListener('click', e => App.handlers.handleGroupTableClick(e));
            App.DOMElements.unassignedStudentsList.addEventListener('click', e => App.handlers.handleStudentListItemClick(e, 'unassigned'));
            App.DOMElements.assignedStudentsList.addEventListener('click', e => App.handlers.handleStudentListItemClick(e, 'assigned'));
            App.DOMElements.leaderboardToggle.addEventListener('click', e => App.handlers.handleLeaderboardToggle(e));


            App.DOMElements.groupLeaderboardToggle.addEventListener('click', e => App.handlers.handleGroupLeaderboardToggle(e));


            App.DOMElements.turntablePrizeTableBody.addEventListener('click', e => App.handlers.handleTurntablePrizeTableClick(e));

            document.getElementById('record-table').querySelector('tbody').addEventListener('click', e => App.handlers.handleRecordTableClick(e));

            App.DOMElements.btnPrintSummary.addEventListener('click', () => App.print.summary());
            App.DOMElements.btnPrintDetails.addEventListener('click', () => App.print.details());
        },

        // --- 重构：Handlers ---
        // handler 只负责接收用户输入，调用 action，并根据返回结果更新 UI
        handlers: {

            handleDashboardSortClick: (e) => {
                const btn = e.target.closest('.sort-btn');
                if (!btn) return;

                const sortKey = btn.dataset.sort;
                const currentSort = App.state.dashboardSortState;
                let newDirection = 'desc'; // 默认降序

                // 如果是按名字排序，默认改为升序 (A-Z)
                if (sortKey === 'name') {
                    newDirection = 'asc';
                }

                // 如果点击的是当前已激活的排序按钮，则切换排序方向
                if (currentSort.column === sortKey) {
                    newDirection = currentSort.direction === 'asc' ? 'desc' : 'asc';
                }

                App.state.dashboardSortState = { column: sortKey, direction: newDirection };
                App.render(); // 重新渲染所有视图
            },
            // ========== 在 script.js 中，用下面这个最终优化版的代码块，完整替换掉旧的 handleNavClick 函数 ==========
            handleNavClick: (e) => {
                const v = e.currentTarget.dataset.view;
                App.DOMElements.navItems.forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                App.DOMElements.views.forEach(v => v.classList.remove('active'));
                document.getElementById(`view-${v}`).classList.add('active');

                // 如果用户点击的是“幸运大转盘”，则进行初始化
                if (v === 'turntable') {
                    App.render.turntablePrizes();
                    App.handlers.initTurntable();
                    App.DOMElements.turntableCostInput.value = App.state.turntableCost;
                }
                // 否则（即用户离开大转盘或访问其他页面），检查并销毁大转盘实例
                else if (App.turntableInstance) {

                    // --- 核心修复：更安全的清理逻辑 ---
                    App.turntableInstance.responsive = false; // 停止响应式，移除事件监听

                    // **关键修改**：只在转盘正在转动时才调用 stopAnimation
                    if (App.turntableInstance.isSpinning) {
                        App.turntableInstance.stopAnimation(false);
                    }

                    // 清理画布
                    const canvas = App.DOMElements.turntableCanvas;
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    // 将实例设置为空
                    App.turntableInstance = null;
                }

                // 保留其他页面的逻辑
                if (v === 'print') {
                    App.render.printStudentSelect();
                }
            },
            // =================================================================================================

            //handleNavClick: (e) => { const v = e.currentTarget.dataset.view; App.DOMElements.navItems.forEach(i => i.classList.remove('active')); e.currentTarget.classList.add('active'); App.DOMElements.views.forEach(v => v.classList.remove('active')); document.getElementById(`view-${v}`).classList.add('active'); if (v === 'turntable') { App.render.turntablePrizes(); App.handlers.initTurntable(); App.DOMElements.turntableCostInput.value = App.state.turntableCost; } if (v === 'print') { App.render.printStudentSelect(); } },
            handleCardClick: (e) => {
                const card = e.target.closest('.student-card');
                if (!card) return;
                const id = card.dataset.id;
                if (e.target.matches('.points-btn')) App.handlers.openPointsModal(id);
                if (e.target.matches('.record-btn')) App.handlers.openIndividualRecordModal(id); // <--- 新增行
                if (e.target.matches('.edit-btn')) App.handlers.openStudentModal(id);
                if (e.target.matches('.delete-btn')) {
                    App.ui.showConfirm('确认删除此学生吗？', () => {
                        App.actions.deleteStudent(id); App.render(); App.ui.showNotification('学生已删除。');
                    });
                }
            },
            handleStudentTableClick: (e) => {
                const row = e.target.closest('tr');
                if (!row) return;
                const id = row.dataset.id;
                if (e.target.matches('.record-btn')) App.handlers.openIndividualRecordModal(id); // <--- 新增行
                if (e.target.matches('.edit-btn')) App.handlers.openStudentModal(id);
                if (e.target.matches('.delete-btn')) {
                    App.ui.showConfirm('确认删除此学生吗？', () => {
                        App.actions.deleteStudent(id);
                        App.render();
                        App.ui.showNotification('学生已删除。');
                    });
                }
            },
            openIndividualRecordModal(studentId) {
                const student = App.state.students.find(s => s.id === studentId);
                if (!student) {
                    App.ui.showNotification('找不到该学生的信息。', 'error');
                    return;
                }
                App.DOMElements.individualRecordModalTitle.innerText = `【${student.name}】的积分记录`;
                App.render.individualRecords(studentId); // 调用新的渲染函数
                App.ui.openModal(App.DOMElements.individualRecordModal);
            },
            //handleStudentTableClick: (e) => { const row = e.target.closest('tr'); if (!row) return; const id = row.dataset.id; if (e.target.matches('.edit-btn')) App.handlers.openStudentModal(id); if (e.target.matches('.delete-btn')) { App.ui.showConfirm('确认删除此学生吗？', () => { App.actions.deleteStudent(id); App.render(); App.ui.showNotification('学生已删除。'); }); } },
            handleGroupTableClick: (e) => {
                const row = e.target.closest('tr');
                if (!row) return;
                const id = row.dataset.id;
                if (e.target.matches('.bulk-edit-btn')) App.handlers.openBulkGroupModal(id); // <--- 新增
                if (e.target.matches('.edit-btn')) App.handlers.openGroupModal(id);
                if (e.target.matches('.delete-btn')) {
                    App.ui.showConfirm('删除小组会将该小组学生置为未分组，确认删除？', () => {
                        App.actions.deleteGroup(id);
                        App.render();
                        App.ui.showNotification('小组已删除。');
                    });
                }
            },
            //handleGroupTableClick: (e) => { const row = e.target.closest('tr'); if (!row) return; const id = row.dataset.id; if (e.target.matches('.edit-btn')) App.handlers.openGroupModal(id); if (e.target.matches('.delete-btn')) { App.ui.showConfirm('删除小组会将该小组学生置为未分组，确认删除？', () => { App.actions.deleteGroup(id); App.render(); App.ui.showNotification('小组已删除。'); }); } },
            openBulkGroupModal(groupId) {
                const group = App.state.groups.find(g => g.id === groupId);
                if (!group) return;

                App.DOMElements.bulkGroupName.innerText = group.name;
                App.DOMElements.bulkGroupIdInput.value = group.id;

                App.render.bulkGroupEditor(groupId); // 调用新的渲染函数
                App.ui.openModal(App.DOMElements.bulkGroupModal);
            },

            handleStudentListItemClick(e, type) {
                if (e.target.tagName !== 'LI') return;

                const studentId = e.target.dataset.id;
                const studentName = e.target.innerText;
                const targetList = type === 'unassigned' ? App.DOMElements.assignedStudentsList : App.DOMElements.unassignedStudentsList;

                // 创建一个新的 li 元素并移动
                const newItem = document.createElement('li');
                newItem.dataset.id = studentId;
                newItem.innerText = studentName;
                targetList.appendChild(newItem);

                // 从原列表中移除
                e.target.remove();
            },

            handleBulkGroupFormSubmit(e) {
                e.preventDefault();
                const groupId = App.DOMElements.bulkGroupIdInput.value;
                const assignedListItems = App.DOMElements.assignedStudentsList.querySelectorAll('li');

                const newMemberIds = Array.from(assignedListItems).map(li => li.dataset.id);

                const result = App.actions.bulkUpdateGroupMembers(groupId, newMemberIds);

                if (result.success) {
                    App.ui.showNotification('小组成员已成功更新！');
                    App.ui.closeModal(App.DOMElements.bulkGroupModal);
                    App.render(); // 重新渲染所有视图以更新数据
                } else {
                    App.ui.showNotification('更新失败，请重试。', 'error');
                }
            },
            handleStudentFormSubmit: (e) => {
                e.preventDefault();
                const internalId = App.DOMElements.studentIdInput.value; // 这是隐藏的、原始的ID
                const newStudentId = App.DOMElements.studentIdDisplayInput.value.trim(); // 这是用户可能修改过的、新的ID
                const name = App.DOMElements.studentNameInput.value.trim();
                const group = App.DOMElements.studentGroupSelect.value;

                if (!newStudentId || !name) {
                    App.ui.showNotification('请输入学生ID和姓名！', 'error');
                    return;
                }

                let result;
                if (internalId) { // 这是编辑模式
                    // 调用我们更新过的 updateStudent Action
                    result = App.actions.updateStudent(internalId, newStudentId, name, group);
                } else { // 这是新增模式 (逻辑不变)
                    if (App.state.students.some(s => s.id === newStudentId)) {
                        App.ui.showNotification('错误：学生ID ' + newStudentId + ' 已存在！', 'error');
                        return;
                    }
                    result = App.actions.addStudent(newStudentId, name, group);
                }

                if (result.success) {
                    App.ui.showNotification(internalId ? '学生信息已更新' : '学生添加成功');
                    App.ui.closeModal(App.DOMElements.studentModal);
                    App.render();
                } else {
                    App.ui.showNotification(result.message, 'error');
                }
            },
            //handleStudentFormSubmit: (e) => { e.preventDefault(); const id = App.DOMElements.studentIdInput.value; const name = App.DOMElements.studentNameInput.value.trim(); const group = App.DOMElements.studentGroupSelect.value; if (!name) { App.ui.showNotification('请输入学生姓名！', 'error'); return; } const result = id ? App.actions.updateStudent(id, name, group) : App.actions.addStudent(name, group); if (result.success) { App.ui.showNotification(id ? '学生信息已更新' : '学生添加成功'); App.ui.closeModal(App.DOMElements.studentModal); App.render(); } else { App.ui.showNotification(result.message, 'error'); } },
            handleGroupFormSubmit: (e) => { e.preventDefault(); const id = App.DOMElements.groupIdInput.value; const name = App.DOMElements.groupNameInput.value.trim(); if (!name) { App.ui.showNotification('请输入小组名称！', 'error'); return; } const result = id ? App.actions.updateGroup(id, name) : App.actions.addGroup(name); if (result.success) { App.ui.showNotification(id ? '小组信息已更新' : '小组添加成功'); App.ui.closeModal(App.DOMElements.groupModal); App.render(); } else { App.ui.showNotification(result.message, 'error'); } },
            handleRewardFormSubmit: (e) => { e.preventDefault(); const id = App.DOMElements.rewardIdInput.value; const name = App.DOMElements.rewardNameInput.value.trim(); const cost = App.DOMElements.rewardCostInput.value; if (!name || !cost || cost < 1) { App.ui.showNotification('请填写有效的奖品名称和积分！', 'error'); return; } const result = id ? App.actions.updateReward(id, name, cost) : App.actions.addReward(name, cost); if (result.success) { App.ui.showNotification(id ? '奖品信息已更新' : '奖品上架成功'); App.ui.closeModal(App.DOMElements.rewardModal); App.render(); } },
            handleRedeemFormSubmit: (e) => { e.preventDefault(); const studentId = App.DOMElements.redeemStudentSelect.value; const rewardId = App.DOMElements.redeemRewardIdInput.value; if (!studentId) { App.ui.showNotification('请选择一个学生！', 'error'); return; } const result = App.actions.redeemReward(studentId, rewardId); if (result.success) { const studentName = App.state.students.find(s => s.id === studentId).name; const rewardName = App.state.rewards.find(r => r.id === rewardId).name; App.ui.showNotification(`${studentName} 成功兑换 ${rewardName}！`); App.ui.closeModal(App.DOMElements.redeemModal); App.render(); } else { App.ui.showNotification(result.message, 'error'); } },
            handleGroupPointsFormSubmit: (e) => { e.preventDefault(); const groupId = App.DOMElements.groupPointsSelect.value; const points = App.DOMElements.groupPointsAmount.value; const reason = App.DOMElements.groupPointsReason.value.trim(); if (!groupId || !points || !reason || parseInt(points) === 0) { App.ui.showNotification('请填写所有有效字段！', 'error'); return; } const result = App.actions.addGroupPoints(groupId, parseInt(points), reason); if (result.success) { const groupName = App.state.groups.find(g => g.id === groupId)?.name; App.ui.showNotification(`已成功为【${groupName}】小组加分`); App.ui.closeModal(App.DOMElements.groupPointsModal); App.render(); } else { App.ui.showNotification(result.message, 'error'); } },
            handleAllPointsFormSubmit: (e) => { e.preventDefault(); const amount = App.DOMElements.allPointsAmount.value; const reason = App.DOMElements.allPointsReason.value.trim(); if (!amount || parseInt(amount) === 0 || !reason) { App.ui.showNotification('请填写有效的分数和原因！', 'error'); return; } const result = App.actions.addAllPoints(parseInt(amount), reason); if (result.success) { App.ui.showNotification('已成功为全班成员调整积分'); App.ui.closeModal(App.DOMElements.allPointsModal); App.render(); } else { App.ui.showNotification(result.message, 'error'); } },
            handlePointsFormSubmit: (e) => { e.preventDefault(); const studentId = App.DOMElements.pointsStudentIdInput.value; const amount = App.DOMElements.pointsChangeAmount.value; const reason = App.DOMElements.pointsChangeReason.value.trim(); if (!amount || parseInt(amount) === 0 || !reason) { App.ui.showNotification('请填写有效的分数和原因！', 'error'); return; } const result = App.actions.changePoints(studentId, parseInt(amount), reason); if (result.success) { App.ui.showNotification('积分调整成功'); App.ui.closeModal(App.DOMElements.pointsModal); App.render(); } else { App.ui.showNotification(result.message, 'error'); } },
            handleSpinSelectFormSubmit: (e) => { e.preventDefault(); const studentId = App.DOMElements.spinStudentSelect.value; if (!studentId) { App.ui.showNotification('请选择一位学生！', 'error'); return; } App.currentSpinnerId = studentId; App.actions.changePoints(studentId, -App.state.turntableCost, '幸运大转盘抽奖'); App.ui.closeModal(App.DOMElements.spinSelectModal); App.render(); if (App.turntableInstance) { App.turntableInstance.stopAnimation(false); App.turntableInstance.rotationAngle = 0; App.turntableInstance.draw(); App.turntableInstance.startAnimation(); } },
            spinFinished: (indicatedSegment) => { const sId = App.currentSpinnerId; if (!sId) return; const student = App.state.students.find(s => s.id === sId); App.ui.showNotification(`${student.name} 抽中了: ${indicatedSegment.text}`); if (indicatedSegment.text.includes('+')) { const points = parseInt(indicatedSegment.text); if (!isNaN(points)) App.actions.changePoints(sId, points, `幸运转盘: ${indicatedSegment.text}`); } App.render(); App.currentSpinnerId = null; },
            handleTurntablePrizeFormSubmit: (e) => {
                e.preventDefault();
                const id = App.DOMElements.turntablePrizeIdInput.value;
                const name = App.DOMElements.turntablePrizeNameInput.value.trim();
                if (!name) {
                    App.ui.showNotification('请输入奖品名称！', 'error');
                    return;
                }

                const result = id ? App.actions.updateTurntablePrize(id, name) : App.actions.addTurntablePrize(name);

                if (result.success) {
                    App.ui.closeModal(App.DOMElements.turntablePrizeModal);

                    // 调用主渲染函数来更新所有UI，包括奖品列表
                    App.render();

                    // 渲染完成后，重新初始化转盘画布以显示新的奖品
                    App.handlers.initTurntable();

                    App.ui.showNotification('转盘奖品已更新');
                }
            },

            handleTurntablePrizeTableClick: (e) => { const row = e.target.closest('tr'); if (!row) return; const prizeId = row.dataset.id; if (e.target.matches('.edit-btn')) App.handlers.openTurntablePrizeModal(prizeId); if (e.target.matches('.delete-btn')) { App.ui.showConfirm('确认删除此奖品吗？', () => { App.actions.deleteTurntablePrize(prizeId); App.handlers.initTurntable(); App.render.turntablePrizes(); App.ui.showNotification('奖品已删除。'); }); } },
            handleRewardCardClick: (e) => { const card = e.target.closest('.reward-card'); if (!card) return; const id = card.dataset.id; if (e.target.matches('.redeem-btn')) App.handlers.openRedeemModal(id); if (e.target.matches('.edit-btn')) App.handlers.openRewardModal(id); if (e.target.matches('.delete-btn')) { App.ui.showConfirm('确认删除此奖品吗？', () => { App.actions.deleteReward(id); App.render(); App.ui.showNotification('奖品已删除'); }); } },
            // ... (其余 modal open/close 和简单 handlers 保持不变或已整合)
            openStudentModal: (id = null) => {
                App.DOMElements.studentForm.reset();
                App.DOMElements.studentIdInput.value = id || '';
                const s = App.DOMElements.studentGroupSelect;
                s.innerHTML = '<option value="">未分组</option>';
                App.state.groups.forEach(g => {
                    const o = document.createElement('option');
                    o.value = g.id;
                    o.text = g.name;
                    s.add(o)
                });
                const idDisplayInput = App.DOMElements.studentIdDisplayInput; // <--- 新增
                if (id) {
                    const t = App.state.students.find(st => st.id === id);
                    idDisplayInput.value = t.id; // <--- 新增
                    //idDisplayInput.readOnly = true; // <--- 新增 (编辑时ID只读)
                    App.DOMElements.studentNameInput.value = t.name;
                    s.value = t.group;
                    App.DOMElements.studentModalTitle.innerText = '编辑学生'
                } else {
                    idDisplayInput.value = ''; // <--- 新增
                    idDisplayInput.readOnly = false; // <--- 新增 (新增时ID可写)
                    App.DOMElements.studentModalTitle.innerText = '新增学生'
                }
                App.ui.openModal(App.DOMElements.studentModal);
            },
            //openStudentModal: (id = null) => { App.DOMElements.studentForm.reset(); App.DOMElements.studentIdInput.value = id || ''; const s = App.DOMElements.studentGroupSelect; s.innerHTML = '<option value="">未分组</option>'; App.state.groups.forEach(g => { const o = document.createElement('option'); o.value = g.id; o.text = g.name; s.add(o) }); if (id) { const t = App.state.students.find(st => st.id === id); App.DOMElements.studentNameInput.value = t.name; s.value = t.group; App.DOMElements.studentModalTitle.innerText = '编辑学生' } else App.DOMElements.studentModalTitle.innerText = '新增学生'; App.ui.openModal(App.DOMElements.studentModal); },
            openGroupModal: (id = null) => { App.DOMElements.groupForm.reset(); App.DOMElements.groupIdInput.value = id || ''; if (id) { const g = App.state.groups.find(gr => gr.id === id); App.DOMElements.groupNameInput.value = g.name; App.DOMElements.groupModal.querySelector('h2').innerText = '编辑小组' } else App.DOMElements.groupModal.querySelector('h2').innerText = '新增小组'; App.ui.openModal(App.DOMElements.groupModal); },
            openRewardModal: (id = null) => { App.DOMElements.rewardForm.reset(); App.DOMElements.rewardIdInput.value = id || ''; if (id) { const r = App.state.rewards.find(r => r.id === id); App.DOMElements.rewardModalTitle.innerText = '编辑奖品'; App.DOMElements.rewardNameInput.value = r.name; App.DOMElements.rewardCostInput.value = r.cost } else App.DOMElements.rewardModalTitle.innerText = '上架新奖品'; App.ui.openModal(App.DOMElements.rewardModal); },
            openRedeemModal: (rId) => { const r = App.state.rewards.find(r => r.id === rId); if (!r) return; App.DOMElements.redeemRewardIdInput.value = rId; App.DOMElements.redeemRewardName.innerText = r.name; App.DOMElements.redeemRewardCost.innerText = r.cost; const s = App.DOMElements.redeemStudentSelect; s.innerHTML = '<option value="">-- 选择学生 --</option>'; App.state.students.filter(st => st.points >= r.cost).forEach(st => { const o = document.createElement('option'); o.value = st.id; o.innerText = `${st.name} (当前 ${st.points} 积分)`; s.add(o) }); App.ui.openModal(App.DOMElements.redeemModal); },

            openGroupPointsModal() {
                App.DOMElements.groupPointsForm.reset();
                const s = App.DOMElements.groupPointsSelect;
                s.innerHTML = '<option value="">-- 请选择一个小组 --</option>';
                App.state.groups.forEach(g => {
                    const o = document.createElement('option');
                    o.value = g.id;
                    o.innerText = g.name;
                    s.add(o);
                });

                // --- ⬇️ 新增渲染逻辑 ⬇️ ---
                const container = App.DOMElements.groupPointsModal.querySelector('#group-quick-reason-container');
                container.innerHTML = '';
                App.state.quickReasons.forEach(reason => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    // 注意：使用一个新类名，区别于之前的 .quick-reason-btn
                    btn.className = 'btn btn-sm batch-quick-reason-btn';
                    btn.dataset.points = reason.points;
                    btn.dataset.reason = reason.text;
                    btn.textContent = `${reason.text} (${reason.points > 0 ? '+' : ''}${reason.points})`;
                    container.appendChild(btn);
                });
                // --- ⬆️ 新增结束 ⬆️ ---

                App.ui.openModal(App.DOMElements.groupPointsModal);
            },

            //openGroupPointsModal() { App.DOMElements.groupPointsForm.reset(); const s = App.DOMElements.groupPointsSelect; s.innerHTML = '<option value="">-- 请选择一个小组 --</option>'; App.state.groups.forEach(g => { const o = document.createElement('option'); o.value = g.id; o.innerText = g.name; s.add(o) }); App.ui.openModal(App.DOMElements.groupPointsModal); },

            openPointsModal(sId) {
                const s = App.state.students.find(s => s.id === sId);
                if (!s) return;
                App.DOMElements.pointsForm.reset();
                App.DOMElements.pointsStudentName.innerText = s.name;
                App.DOMElements.pointsStudentIdInput.value = sId;

                // --- ⬇️ 这是新增的“连线”代码 ⬇️ ---

                // 1. 找到我们在 HTML 中创建的按钮容器
                const container = App.DOMElements.pointsModal.querySelector('#quick-reason-buttons-container');
                if (container) {
                    // 2. 清空旧按钮（防止多次打开时重复添加）
                    container.innerHTML = '';

                    // 3. 遍历 App.state 中的快捷理由
                    App.state.quickReasons.forEach(reason => {
                        const btn = document.createElement('button');
                        btn.type = 'button'; // 关键：防止它提交表单

                        // 4. 设置 className 来匹配你的点击处理器
                        btn.className = 'btn btn-sm quick-reason-btn';

                        // 5. 将理由和分数存入 dataset (你的点击处理器已准备好读取它们)
                        btn.dataset.points = reason.points;
                        btn.dataset.reason = reason.text;

                        const pointsText = reason.points > 0 ? `+${reason.points}` : reason.points;
                        btn.textContent = `${reason.text} (${pointsText})`;

                        container.appendChild(btn);
                    });
                }

                // --- ⬆️ 新增代码结束 ⬆️ ---

                App.ui.openModal(App.DOMElements.pointsModal);
                App.DOMElements.pointsChangeAmount.focus();
            },

            //openPointsModal(sId) { const s = App.state.students.find(s => s.id === sId); if (!s) return; App.DOMElements.pointsForm.reset(); App.DOMElements.pointsStudentName.innerText = s.name; App.DOMElements.pointsStudentIdInput.value = sId; App.ui.openModal(App.DOMElements.pointsModal); App.DOMElements.pointsChangeAmount.focus() },

            handlePointsModalClick: (e) => {
                // 检查点击的是否是快捷按钮
                if (!e.target.matches('.quick-reason-btn')) return;

                const btn = e.target;
                const points = parseInt(btn.dataset.points);
                const reason = btn.dataset.reason;

                // 关键：从隐藏字段获取当前正在操作的学生ID
                const studentId = App.DOMElements.pointsStudentIdInput.value;

                if (!studentId) {
                    App.ui.showNotification('未找到学生ID，操作失败', 'error');
                    return;
                }

                // --- 升级！不再填充表单，而是直接执行操作 ---

                // 1. 调用核心 action
                const result = App.actions.changePoints(studentId, points, reason);

                if (result.success) {
                    // 2. 关闭当前弹窗
                    App.ui.closeModal(App.DOMElements.pointsModal);

                    // 3. 弹出成功提示
                    const student = App.state.students.find(s => s.id === studentId);
                    const action = points > 0 ? '加分' : '扣分';
                    App.ui.showNotification(`已为 ${student.name} ${action} ${Math.abs(points)} 分！`);

                    // 4. 刷新界面
                    App.render();
                } else {
                    App.ui.showNotification(result.message, 'error');
                }
            },

            handleBatchQuickReasonClick: (e) => {
                // 只响应我们新创建的按钮
                if (!e.target.matches('.batch-quick-reason-btn')) return;

                const btn = e.target;
                const points = btn.dataset.points;
                const reason = btn.dataset.reason;

                // 找到这个按钮所在的模态框
                const modal = btn.closest('.modal');
                if (!modal) return;

                // 找到该模态框内的表单
                const form = modal.querySelector('form');
                if (!form) return;

                // 找到表单中的第一个数字输入框和第一个文本输入框
                const amountInput = form.querySelector('input[type="number"]');
                const reasonInput = form.querySelector('input[type="text"]');

                // 填充它们！
                if (amountInput) amountInput.value = points;
                if (reasonInput) reasonInput.value = reason;
            },

            openAllPointsModal() {
                App.DOMElements.allPointsForm.reset();

                // --- ⬇️ 新增渲染逻辑 ⬇️ ---
                const container = App.DOMElements.allPointsModal.querySelector('#all-quick-reason-container');
                container.innerHTML = '';
                App.state.quickReasons.forEach(reason => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'btn btn-sm batch-quick-reason-btn'; // 使用新类名
                    btn.dataset.points = reason.points;
                    btn.dataset.reason = reason.text;
                    btn.textContent = `${reason.text} (${reason.points > 0 ? '+' : ''}${reason.points})`;
                    container.appendChild(btn);
                });
                // --- ⬆️ 新增结束 ⬆️ ---

                App.ui.openModal(App.DOMElements.allPointsModal);
            },

            //openAllPointsModal() { App.DOMElements.allPointsForm.reset(); App.ui.openModal(App.DOMElements.allPointsModal); },
            openTurntablePrizeModal(id = null) { App.DOMElements.turntablePrizeForm.reset(); App.DOMElements.turntablePrizeIdInput.value = id || ''; if (id) { const p = App.state.turntablePrizes.find(p => p.id === id); App.DOMElements.turntablePrizeNameInput.value = p.text; App.DOMElements.turntablePrizeModalTitle.innerText = '编辑奖品'; } else { App.DOMElements.turntablePrizeModalTitle.innerText = '新增奖品'; } App.ui.openModal(App.DOMElements.turntablePrizeModal); },
            openSpinSelectModal() { if (App.turntableInstance && App.turntableInstance.isSpinning) return; if (App.state.turntablePrizes.length === 0) { App.ui.showNotification('请先在右侧添加奖品！', 'error'); return; } App.DOMElements.spinCostDisplay.innerText = App.state.turntableCost; const s = App.DOMElements.spinStudentSelect; s.innerHTML = '<option value="">-- 选择学生 --</option>'; App.state.students.filter(st => st.points >= App.state.turntableCost).forEach(st => { const o = document.createElement('option'); o.value = st.id; o.innerText = `${st.name} (当前 ${st.points} 积分)`; s.add(o) }); App.ui.openModal(App.DOMElements.spinSelectModal); },
            // ========== 在 script.js 的 App.handlers 对象中，用下面这个函数完整替换掉旧的 initTurntable 函数 ==========
            initTurntable() {
                // 确保 canvas 元素存在
                if (!App.DOMElements.turntableCanvas) return;

                // --- 关键修复：在重置前也进行安全检查 ---
                if (App.turntableInstance) {
                    // **核心修改**：只有当转盘正在转动时，才调用 stopAnimation
                    if (App.turntableInstance.isSpinning) {
                        App.turntableInstance.stopAnimation(false);
                    }
                }

                // --- 后面是现有的、正确的清理和重置逻辑 ---
                const canvas = App.DOMElements.turntableCanvas;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                App.turntableInstance = null;

                const prizes = App.state.turntablePrizes.length > 0
                    ? App.state.turntablePrizes
                    : [{ text: '谢谢参与' }];

                const colors = ["#8C236E", "#2C638C", "#3C8C4D", "#D99E3D", "#D9523D", "#8C2323", "#45238C", "#238C80"];

                App.turntableInstance = new Winwheel({
                    'canvasId': 'turntable-canvas',
                    'numSegments': prizes.length,
                    'responsive': true,
                    'segments': prizes.map((p, i) => ({
                        ...p,
                        fillStyle: colors[i % colors.length],
                        textFillStyle: '#ffffff'
                    })),
                    'animation': {
                        'type': 'spinToStop',
                        'duration': 8,
                        'spins': 10,
                        'callbackFinished': App.handlers.spinFinished,
                    }
                });
            },
            // ===========================================================================================
            //initTurntable() { if (!App.DOMElements.turntableCanvas) return; if (App.turntableInstance) { App.turntableInstance.stopAnimation(false); App.turntableInstance = null; } const prizes = App.state.turntablePrizes.length > 0 ? App.state.turntablePrizes : [{ text: '谢谢参与' }]; const colors = ["#8C236E", "#2C638C", "#3C8C4D", "#D99E3D", "#D9523D", "#8C2323", "#45238C", "#238C80"]; App.turntableInstance = new Winwheel({ 'canvasId': 'turntable-canvas', 'numSegments': prizes.length, 'responsive': true, 'segments': prizes.map((p, i) => ({ ...p, fillStyle: colors[i % colors.length], textFillStyle: '#ffffff' })), 'animation': { 'type': 'spinToStop', 'duration': 8, 'spins': 10, 'callbackFinished': App.handlers.spinFinished, } }); },
            handleSortClick: (e) => { const h = e.target.closest('th.sortable'); if (!h) return; const sKey = h.dataset.sort; const cSort = App.state.sortState; let nDir = 'asc'; if (cSort.column === sKey) { nDir = cSort.direction === 'asc' ? 'desc' : 'asc' } App.state.sortState = { column: sKey, direction: nDir }; App.render() },
            handleLeaderboardToggle: (e) => { const b = e.target.closest('.toggle-btn'); if (!b) return; const t = b.dataset.type; if (App.state.leaderboardType !== t) { App.state.leaderboardType = t; App.render(); } },
            handleGroupLeaderboardToggle: (e) => {
                const btn = e.target.closest('.toggle-btn');
                if (!btn) return;
                const type = btn.dataset.type;
                if (App.state.groupLeaderboardType !== type) {
                    App.state.groupLeaderboardType = type;
                    App.render.groupLeaderboard(); // 只重新渲染小组排行榜
                }
            },




            openPasteImportModal() {
                App.DOMElements.pasteImportForm.reset();
                App.ui.openModal(App.DOMElements.pasteImportModal);
            },

            handlePasteImportSubmit(e) {
                e.preventDefault();
                const namesText = App.DOMElements.pasteStudentNames.value;
                const names = namesText.split(/\r?\n/); // 按换行符分割成数组

                const result = App.actions.addStudentsBatch(names);

                if (result.success) {
                    let message = `导入完成！成功新增 ${result.added} 名学生。`;
                    if (result.skipped > 0) {
                        message += ` 跳过 ${result.skipped} 个已存在的同名学生。`;
                    }
                    App.ui.showNotification(message);
                    App.ui.closeModal(App.DOMElements.pasteImportModal);
                    App.render(); // 重新渲染界面
                } else {
                    App.ui.showNotification(result.message, 'error');
                }
            },


            handleRecordTableClick(e) {
                if (!e.target.matches('.btn-undo-record')) return;

                const recordIndex = e.target.dataset.recordIndex;
                if (recordIndex === null) return;

                App.ui.showConfirm('您确定要撤回这条积分记录吗？此操作将抵消本次积分变动。', () => {
                    const result = App.actions.undoRecord(parseInt(recordIndex));
                    if (result.success) {
                        App.ui.showNotification('操作已成功撤回！');
                        App.render(); // 重新渲染所有视图以更新数据
                    } else {
                        App.ui.showNotification(result.message, 'error');
                    }
                });
            },

            openQuickReasonModal() {
                App.handlers.resetQuickReasonForm(); // 重置表单
                App.render.quickReasonTable(); // 渲染表格
                App.ui.openModal(App.DOMElements.quickReasonModal);
            },

            resetQuickReasonForm() {
                App.DOMElements.quickReasonForm.reset();
                App.DOMElements.quickReasonIdInput.value = '';
                App.DOMElements.btnCancelQuickReasonEdit.style.display = 'none';
            },

            handleQuickReasonFormSubmit(e) {
                e.preventDefault();
                const id = App.DOMElements.quickReasonIdInput.value;
                const text = App.DOMElements.quickReasonTextInput.value;
                const points = App.DOMElements.quickReasonPointsInput.value;

                let result;
                if (id) {
                    result = App.actions.updateQuickReason(id, text, points);
                } else {
                    result = App.actions.addQuickReason(text, points);
                }

                if (result.success) {
                    App.ui.showNotification(id ? '理由已更新' : '理由已添加');
                    App.handlers.resetQuickReasonForm();
                    App.render.quickReasonTable();
                } else {
                    App.ui.showNotification(result.message, 'error');
                }
            },

            handleQuickReasonTableClick(e) {
                const btn = e.target;
                const tr = btn.closest('tr');
                if (!tr) return;
                const id = tr.dataset.id;
                const reason = App.state.quickReasons.find(r => r.id === id);

                if (btn.matches('.btn-edit-reason')) {
                    // 填充表单以供编辑
                    App.DOMElements.quickReasonIdInput.value = reason.id;
                    App.DOMElements.quickReasonTextInput.value = reason.text;
                    App.DOMElements.quickReasonPointsInput.value = reason.points;
                    App.DOMElements.btnCancelQuickReasonEdit.style.display = 'inline-block';
                }

                if (btn.matches('.btn-delete-reason')) {
                    // 删除理由
                    App.ui.showConfirm(`确定要删除快捷理由“${reason.text}”吗？`, () => {
                        const result = App.actions.deleteQuickReason(id);
                        if (result.success) {
                            App.ui.showNotification('理由已删除');
                            App.render.quickReasonTable();
                        }
                    });
                }
            },

            openAchievementModal() {
                App.handlers.resetAchievementForm(); // 重置表单
                App.render.achievementTable(); // 渲染表格
                App.ui.openModal(App.DOMElements.achievementModal);
            },

            resetAchievementForm() {
                App.DOMElements.achievementForm.reset();
                App.DOMElements.achievementIdInput.value = '';
                App.DOMElements.btnCancelAchievementEdit.style.display = 'none';
            },

            handleAchievementFormSubmit(e) {
                e.preventDefault();
                const id = App.DOMElements.achievementIdInput.value;
                const name = App.DOMElements.achievementNameInput.value;
                const points = App.DOMElements.achievementPointsInput.value;

                let result;
                if (id) {
                    result = App.actions.updateAchievementTier(id, name, points);
                } else {
                    result = App.actions.addAchievementTier(name, points);
                }

                if (result.success) {
                    App.ui.showNotification(id ? '称号已更新' : '称号已添加');
                    App.handlers.resetAchievementForm();
                    App.render.achievementTable();
                    App.render.dashboard(); // 刷新仪表盘以显示新称号
                } else {
                    App.ui.showNotification(result.message, 'error');
                }
            },

            handleAchievementTableClick(e) {
                const btn = e.target.closest('button'); // 关键：确保点到图标上也算点到按钮
                if (!btn) return;

                const tr = btn.closest('tr');
                if (!tr) return;
                const id = tr.dataset.id;

                if (btn.matches('.btn-edit-achievement')) {
                    const tier = App.state.achievementTiers.find(t => t.id === id);
                    if (!tier) return;
                    App.DOMElements.achievementIdInput.value = tier.id;
                    App.DOMElements.achievementNameInput.value = tier.name;
                    App.DOMElements.achievementPointsInput.value = tier.points;
                    App.DOMElements.btnCancelAchievementEdit.style.display = 'inline-block';
                }

                if (btn.matches('.btn-delete-achievement')) {
                    const tier = App.state.achievementTiers.find(t => t.id === id);
                    if (!tier) return;
                    App.ui.showConfirm(`确定要删除称号“${tier.name}”吗？`, () => {
                        const result = App.actions.deleteAchievementTier(id);
                        if (result.success) {
                            App.ui.showNotification('称号已删除');
                            App.render.achievementTable();
                            App.render.dashboard(); // 刷新仪表盘
                        }
                    });
                }

                // --- ⬇️ 新增：处理移动按钮 ⬇️ ---
                if (btn.matches('.btn-move-up') || btn.matches('.btn-move-down')) {
                    const direction = btn.matches('.btn-move-up') ? 'up' : 'down';
                    const result = App.actions.moveAchievement(id, direction);

                    if (result.success) {
                        // 重新渲染表格以显示新顺序
                        App.render.achievementTable();
                        // 刷新仪表盘，因为 level 对应的 CSS 可能变了
                        App.render.dashboard();
                    }
                }
                // --- ⬆️ 新增结束 ⬆️ ---
            },


            openStudentPointsModal() {
                // 1. 清空旧的复选框
                App.DOMElements.studentPointsCheckboxContainer.innerHTML = '';

                // 2. 生成新的学生复选框
                // ... (你现有的 forEach 循环代码保持不变) ...
                App.state.students
                    .sort((a, b) => String(a.name).localeCompare(String(b.name), 'zh-Hans-CN'))
                    .forEach(student => {
                        const checkboxDiv = document.createElement('div');
                        checkboxDiv.className = 'checkbox-item';
                        checkboxDiv.innerHTML = `
                <input type="checkbox" id="student-point-${student.id}" name="student-ids" value="${student.id}">
                <label for="student-point-${student.id}">${student.name} (${student.points}⭐)</label>
            `;
                        App.DOMElements.studentPointsCheckboxContainer.appendChild(checkboxDiv);
                    });

                // --- ⬇️ 新增渲染逻辑 ⬇️ ---
                const container = App.DOMElements.studentPointsModal.querySelector('#student-quick-reason-container');
                container.innerHTML = '';
                App.state.quickReasons.forEach(reason => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'btn btn-sm batch-quick-reason-btn'; // 使用新类名
                    btn.dataset.points = reason.points;
                    btn.dataset.reason = reason.text;
                    btn.textContent = `${reason.text} (${reason.points > 0 ? '+' : ''}${reason.points})`;
                    container.appendChild(btn);
                });
                // --- ⬆️ 新增结束 ⬆️ ---

                // 3. 打开模态框
                App.ui.openModal(App.DOMElements.studentPointsModal);
            },

            handleStudentPointsFormSubmit(e) {
                // 关键修复点 1: 阻止表单默认提交行为，防止页面刷新
                e.preventDefault();

                const form = e.target;
                const amountInput = App.DOMElements.studentPointsAmount;
                const reasonInput = App.DOMElements.studentPointsReason;

                const pointsDelta = parseInt(amountInput.value);
                const reason = reasonInput.value.trim();

                if (isNaN(pointsDelta) || pointsDelta === 0) {
                    App.ui.showNotification('请输入一个非零的积分数值！', 'error');
                    return;
                }

                if (!reason) {
                    App.ui.showNotification('请输入加分/扣分的原因！', 'error');
                    return;
                }

                // 获取所有选中的学生ID
                // 注意：这里的 name 属性需要在 HTML 表单中的 input 标签上设置
                const selectedCheckboxes = form.querySelectorAll('input[name="student-ids"]:checked');
                const selectedStudentIds = Array.from(selectedCheckboxes).map(cb => cb.value);

                if (selectedStudentIds.length === 0) {
                    App.ui.showNotification('请至少选择一位学生！', 'error');
                    return;
                }

                // 批量更新积分
                selectedStudentIds.forEach(studentId => {
                    // App.actions.changePoints 是你已有的数据更新和保存逻辑
                    App.actions.changePoints(studentId, pointsDelta, reason);
                });

                // 关键修复点 2: 关闭模态框
                App.ui.closeModal(App.DOMElements.studentPointsModal);

                // 关键修复点 3: 重新渲染 UI，更新积分数据，无需刷新页面
                App.render();

                // 通知用户操作结果
                const action = pointsDelta > 0 ? '加分' : '扣分';
                App.ui.showNotification(`成功为 ${selectedStudentIds.length} 名学生${action} ${Math.abs(pointsDelta)} 分！`);

                // 重置表单，以便下次使用
                form.reset();
            }
        },

        /* --- 您新增的打印功能对象 --- */
        print: {
            // 打印的核心函数，负责打开新窗口并执行打印
            _printContent(title, content) {
                const printWindow = window.open('', '_blank', 'height=600,width=800');
                printWindow.document.write(`
            <html>
            <head>
                <title>${title}</title>
                <style>
                    body { font-family: 'Noto Sans SC', sans-serif; margin: 20px; }
                    h1, h2 { text-align: center; color: #333; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    @media print {
                        body { -webkit-print-color-adjust: exact; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                ${content}
                <script>
                  setTimeout(function() {
                    window.print();
                    window.close();
                  }, 250); // 等待250毫秒确保内容渲染
                </script>
            </body>
            </html>
        `);
                printWindow.document.close();
            },

            // 功能1：打印全体学生积分总览
            summary() {
                const title = '全体学生积分总览';
                const date = new Date().toLocaleString('zh-CN');
                let tableHTML = `
            <h1>${title}</h1>
            <h2>打印时间: ${date}</h2>
            <table>
                <thead>
                    <tr>
                        <th>学生ID</th>
                        <th>姓名</th>
                        <th>实时积分</th>
                        <th>累计积分</th>
                        <th>扣分积分</th>
                    </tr>
                </thead>
                <tbody>
        `;
                App.state.students.forEach(s => {
                    tableHTML += `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.points || 0}</td>
                    <td>${s.totalEarnedPoints || 0}</td>
                    <td>${s.totalDeductions || 0}</td>
                </tr>
            `;
                });
                tableHTML += '</tbody></table>';

                App.print._printContent(title, tableHTML);
            },

            // 功能2：打印单个学生积分明细
            details() {
                const studentId = App.DOMElements.printStudentSelect.value;
                if (!studentId) {
                    App.ui.showNotification('请先选择一个学生！', 'error');
                    return;
                }

                const student = App.state.students.find(s => s.id === studentId);
                const records = App.state.records.filter(r => r.studentId === studentId);
                const title = `“${student.name}”的积分明细`;
                const date = new Date().toLocaleString('zh-CN');

                let tableHTML = `
            <h1>${title}</h1>
            <h2>打印时间: ${date}</h2>
        `;

                if (records.length === 0) {
                    tableHTML += '<p style="text-align:center;">该学生暂无积分记录。</p>';
                } else {
                    tableHTML += `
                <table>
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th>分值变化</th>
                            <th>原因</th>
                            <th>最终积分</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
                    records.slice().reverse().forEach(r => {
                        tableHTML += `
                    <tr>
                        <td>${r.time}</td>
                        <td>${r.change}</td>
                        <td>${r.reason}</td>
                        <td>${r.finalPoints}</td>
                    </tr>
                `;
                    });
                    tableHTML += '</tbody></table>';
                }

                App.print._printContent(title, tableHTML);
            }
        },

        // --- 子渲染函数 (保持不变) ---
        "render.individualRecords": (studentId) => {
            const tbody = App.DOMElements.individualRecordTableBody;
            tbody.innerHTML = ''; // 清空旧记录

            // 从全部记录中筛选出该学生的记录
            const studentRecords = App.state.records
                .filter(r => r.studentId === studentId)
                .slice() // 创建一个副本以进行排序
                .reverse(); // 显示最新记录在最前面

            if (studentRecords.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">该学生暂无积分记录。</td></tr>';
                return;
            }

            studentRecords.forEach(r => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <td>${r.time}</td>
            <td>${r.change}</td>
            <td>${r.reason}</td>
            <td>${r.finalPoints}</td>
        `;
                tbody.appendChild(tr);
            });
        },
        "render.stats": () => { const sc = App.state.students.length; const tp = App.state.students.reduce((s, st) => s + st.points, 0); App.DOMElements.statStudentCount.innerText = sc; App.DOMElements.statGroupCount.innerText = App.state.groups.length; App.DOMElements.statTotalPoints.innerText = tp; App.DOMElements.statAvgPoints.innerText = sc ? (tp / sc).toFixed(1) : 0; },

        "render.dashboard": (st = '') => {
            const c = App.DOMElements.studentCardsContainer;
            c.innerHTML = '';

            // 1. 先按搜索词过滤
            let studentsToRender = App.state.students.filter(s => s.name.toLowerCase().includes(st.toLowerCase()));

            if (studentsToRender.length === 0) {
                c.innerHTML = '<p>没有找到符合条件的学生。</p>';
                return;
            }

            // 2. 对过滤后的结果进行排序
            const { column, direction } = App.state.dashboardSortState;
            studentsToRender.sort((a, b) => {
                let valA = a[column];
                let valB = b[column];
                let comparison = 0;
                if (column === 'points') {
                    comparison = (valA || 0) - (valB || 0);
                } else { // 假设是 'name'
                    comparison = String(valA || '').localeCompare(String(valB || ''), 'zh-Hans-CN');
                }
                return direction === 'desc' ? comparison * -1 : comparison;
            });

            // 3. 渲染排序后的卡片
            studentsToRender.forEach(s => {
                const card = document.createElement('div');
                const achievement = App.helpers.getAchievement(s.totalEarnedPoints);
                card.className = `student-card ${achievement ? 'tier-level-' + achievement.level : ''}`;
                //card.className = `student-card ${achievement ? achievement.className : ''}`;
                if (s.justLeveledUp) {
                    card.classList.add('level-up-fx');
                    delete s.justLeveledUp;
                }
                card.dataset.id = s.id;
                const g = App.state.groups.find(g => g.id === s.group)?.name || '未分组';
                const titleHTML = achievement ? `<span class="achievement-title" data-tier-level="${achievement.level}">${achievement.title}</span>` : '';
                //const titleHTML = achievement ? `<span class="achievement-title" data-tier="${achievement.title}">${achievement.title}</span>` : '';
                card.innerHTML = `
            <div class="card-header">
                <div class="name-line">
                    <span class="name">${s.name}</span>
                    ${titleHTML} 
                </div>
                <span class="group">${g}</span>
            </div>
            <div class="card-body">
                <div class="label">当前积分</div>
                <div class="points">${s.points}</div>
            </div>
            <div class="card-actions">
                <span class="icon-btn points-btn" title="调整积分">➕➖</span>
                <div class="card-admin-icons">
                    <span class="icon-btn record-btn" title="查看记录">📄</span>
                    <span class="icon-btn edit-btn" title="编辑学生">✏️</span>
                    <span class="icon-btn delete-btn" title="删除学生">🗑️</span>
                </div>
            </div>`;
                c.appendChild(card);
            });
        },


        "render.bulkGroupEditor": (groupId) => {
            const unassignedList = App.DOMElements.unassignedStudentsList;
            const assignedList = App.DOMElements.assignedStudentsList;
            unassignedList.innerHTML = '';
            assignedList.innerHTML = '';

            const unassignedStudents = App.state.students.filter(s => !s.group || s.group === '');
            const assignedStudents = App.state.students.filter(s => s.group === groupId);

            unassignedStudents.forEach(student => {
                const li = document.createElement('li');
                li.dataset.id = student.id;
                li.innerText = student.name;
                unassignedList.appendChild(li);
            });

            assignedStudents.forEach(student => {
                const li = document.createElement('li');
                li.dataset.id = student.id;
                li.innerText = student.name;
                assignedList.appendChild(li);
            });
        },
        //"render.dashboard": (st = '') => { const c = App.DOMElements.studentCardsContainer; c.innerHTML = ''; const f = App.state.students.filter(s => s.name.toLowerCase().includes(st.toLowerCase())); if (f.length === 0) { c.innerHTML = '<p>没有找到符合条件的学生。</p>'; return; } f.forEach(s => { const card = document.createElement('div'); card.className = 'student-card'; card.dataset.id = s.id; const g = App.state.groups.find(g => g.id === s.group)?.name || '未分组'; card.innerHTML = `<div class="card-header"><span class="name">${s.name}</span><span class="group">${g}</span></div><div class="card-body"><div class="label">当前积分</div><div class="points">${s.points}</div></div><div class="card-actions"><span class="icon-btn points-btn" title="调整积分">➕➖</span><div class="card-admin-icons"><span class="icon-btn edit-btn" title="编辑学生">✏️</span><span class="icon-btn delete-btn" title="删除学生">🗑️</span></div></div>`; c.appendChild(card); }); },
        // ...
        "render.leaderboard": () => {
            const listElement = App.DOMElements.leaderboardList;
            if (!listElement) return;

            const type = App.state.leaderboardType;
            const titleElement = App.DOMElements.leaderboardTitle;
            App.DOMElements.leaderboardToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.type === type));

            let title = '';
            let sortProperty = '';
            let studentsToList = [];
            let unit = '积分'; // 默认单位

            switch (type) {
                case 'total':
                    title = '🏆 累计积分排行榜';
                    sortProperty = 'totalEarnedPoints';
                    studentsToList = [...App.state.students];
                    break;
                case 'deduction':
                    title = '🏆 扣分积分排行榜';
                    sortProperty = 'totalDeductions';
                    // 仅筛选出有过扣分的学生
                    studentsToList = App.state.students.filter(s => (s.totalDeductions || 0) > 0);
                    unit = '分'; // 扣分榜单位用“分”
                    break;
                default: // 'realtime'
                    title = '🏆 实时积分排行榜';
                    sortProperty = 'points';
                    studentsToList = [...App.state.students];
                    break;
            }

            titleElement.innerText = title;

            // 根据所选属性对学生列表进行降序排序
            studentsToList.sort((a, b) => (b[sortProperty] || 0) - (a[sortProperty] || 0));

            listElement.innerHTML = ''; // 清空旧列表

            if (studentsToList.length === 0) {
                listElement.innerHTML = '<li>暂无相关数据</li>';
                return;
            }

            studentsToList.forEach((student, index) => {
                const li = document.createElement('li');
                const points = student[sortProperty] || 0;
                li.innerHTML = `<span class="rank">${index + 1}.</span><span class="name">${student.name}</span><span class="points">${points} ${unit}</span>`;
                listElement.appendChild(li);
            });
        },
        //"render.leaderboard": () => { const l = App.DOMElements.leaderboardList; if (!l) return; const t = App.state.leaderboardType; App.DOMElements.leaderboardTitle.innerText = t === 'realtime' ? '🏆 实时积分排行榜' : '🏆 累计积分排行榜'; App.DOMElements.leaderboardToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.type === t)); const c = [...App.state.students]; const sP = t === 'realtime' ? 'points' : 'totalEarnedPoints'; c.sort((a, b) => (b[sP] || 0) - (a[sP] || 0)); l.innerHTML = ''; const top = c.slice(0, App.state.students.length); if (top.length === 0) { l.innerHTML = '<li>暂无学生数据</li>'; return; } top.forEach((s, i) => { const li = document.createElement('li'); li.innerHTML = `<span class="rank">${i + 1}.</span><span class="name">${s.name}</span><span class="points">${s[sP] || 0} 积分</span>`; l.appendChild(li); }); },
        "render.studentTable": () => {
            const b = App.DOMElements.studentTableBody;
            b.innerHTML = '';
            const { column, direction } = App.state.sortState;
            const sS = [...App.state.students];
            sS.sort((a, b) => {
                let vA = a[column];
                let vB = b[column];
                let comp = 0;
                if (column === 'points' || column === 'totalEarnedPoints') {
                    comp = (vA || 0) - (vB || 0);
                } else {
                    comp = String(vA || '').localeCompare(String(vB || ''), 'zh-Hans-CN');
                }
                return direction === 'desc' ? comp * -1 : comp;
            });
            sS.forEach(s => {
                const g = App.state.groups.find(g => g.id === s.group)?.name || '未分组';
                const tr = document.createElement('tr');
                tr.dataset.id = s.id;
                // 注意下面这行 innerHTML 的修改
                tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>${g}</td><td>${s.points}</td><td class="actions"><button class="btn btn-info btn-sm record-btn">记录</button><button class="btn btn-primary btn-sm edit-btn">编辑</button><button class="btn btn-danger btn-sm delete-btn">删除</button></td>`;
                b.appendChild(tr);
            });
        },
        //"render.studentTable": () => { const b = App.DOMElements.studentTableBody; b.innerHTML = ''; const { column, direction } = App.state.sortState; const sS = [...App.state.students]; sS.sort((a, b) => { let vA = a[column]; let vB = b[column]; let comp = 0; if (column === 'points' || column === 'totalEarnedPoints') { comp = (vA || 0) - (vB || 0); } else { comp = String(vA || '').localeCompare(String(vB || ''), 'zh-Hans-CN'); } return direction === 'desc' ? comp * -1 : comp; }); sS.forEach(s => { const g = App.state.groups.find(g => g.id === s.group)?.name || '未分组'; const tr = document.createElement('tr'); tr.dataset.id = s.id; tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>${g}</td><td>${s.points}</td><td class="actions"><button class="btn btn-primary btn-sm edit-btn">编辑</button><button class="btn btn-danger btn-sm delete-btn">删除</button></td>`; b.appendChild(tr); }); },
        "render.sortIndicators": () => { const { column, direction } = App.state.sortState; const hs = App.DOMElements.studentTableHeader.querySelectorAll('th.sortable'); hs.forEach(h => { const s = h.querySelector('span'); h.classList.remove('sorted-asc', 'sorted-desc'); if (s) s.innerText = ''; if (h.dataset.sort === column) { h.classList.add(`sorted-${direction}`); if (s) s.innerText = direction === 'asc' ? ' ▲' : ' ▼'; } }); },
        "render.groupTable": () => {
            const b = App.DOMElements.groupTableBody;
            b.innerHTML = '';
            App.state.groups.forEach(g => {
                const m = App.state.students.filter(s => s.group === g.id);
                const a = m.length ? (m.reduce((s, st) => s + st.points, 0) / m.length).toFixed(1) : 0;
                const tr = document.createElement('tr');
                tr.dataset.id = g.id;
                // 注意下面这行 innerHTML 的修改，增加了 .btn-info
                tr.innerHTML = `
            <td>${g.name}</td>
            <td>${m.length}</td>
            <td>${a}</td>
            <td class="actions">
                <button class="btn btn-info btn-sm bulk-edit-btn">管理成员</button>
                <button class="btn btn-primary btn-sm edit-btn">编辑</button>
                <button class="btn btn-danger btn-sm delete-btn">删除</button>
            </td>
        `;
                b.appendChild(tr);
            });
        },
        //"render.groupTable": () => { const b = App.DOMElements.groupTableBody; b.innerHTML = ''; App.state.groups.forEach(g => { const m = App.state.students.filter(s => s.group === g.id); const a = m.length ? (m.reduce((s, st) => s + st.points, 0) / m.length).toFixed(1) : 0; const tr = document.createElement('tr'); tr.dataset.id = g.id; tr.innerHTML = `<td>${g.name}</td><td>${m.length}</td><td>${a}</td><td class="actions"><button class="btn btn-primary btn-sm edit-btn">编辑</button><button class="btn btn-danger btn-sm delete-btn">删除</button></td>`; b.appendChild(tr); }); },
        "render.rewards": () => { const c = App.DOMElements.rewardsContainer; c.innerHTML = ''; if (!App.state.rewards || App.state.rewards.length === 0) { c.innerHTML = '<p>商城里还没有任何奖品，快去上架一个吧！</p>'; return; } App.state.rewards.forEach(r => { const card = document.createElement('div'); card.className = 'reward-card'; card.dataset.id = r.id; card.innerHTML = `<div class="name">${r.name}</div><div class="cost">${r.cost}</div><div class="actions"><button class="btn btn-green redeem-btn">立即兑换</button><div class="admin-actions"><span class="icon-btn edit-btn">✏️</span><span class="icon-btn delete-btn">🗑️</span></div></div>`; c.appendChild(card); }); },

        // 在 App 对象内部，完整替换旧的 render.records 函数
        "render.records": () => {
            const b = App.DOMElements.recordTableBody;
            b.innerHTML = '';
            if (!App.state.records) return;

            // 使用 slice().reverse() 创建一个反转后的副本进行遍历
            const reversedRecords = App.state.records.slice().reverse();

            reversedRecords.forEach((r, reversedIndex) => {
                // 计算原始数组中的索引，这对于撤销操作至关重要
                const originalIndex = App.state.records.length - 1 - reversedIndex;

                const tr = document.createElement('tr');
                // 如果记录被标记为已撤回，则添加 CSS 类
                if (r.undone) {
                    tr.classList.add('record-undone');
                }

                // 根据记录状态决定“操作”列的内容
                const actionsHTML = r.undone
                    ? '<span>已撤回</span>'
                    : `<button class="btn btn-danger btn-sm btn-undo-record" data-record-index="${originalIndex}">撤回</button>`;

                tr.innerHTML = `
            <td>${r.time}</td>
            <td>${r.studentName}</td>
            <td>${r.change}</td>
            <td>${r.reason}</td>
            <td>${r.finalPoints}</td>
            <td class="actions">${actionsHTML}</td>`;

                b.appendChild(tr);
            });
        },

        //"render.records": () => { const b = App.DOMElements.recordTableBody; b.innerHTML = ''; if (!App.state.records) return; b.innerHTML = ''; App.state.records.slice().reverse().forEach(r => { const tr = document.createElement('tr'); tr.innerHTML = `<td>${r.time}</td><td>${r.studentName}</td><td>${r.change}</td><td>${r.reason}</td><td>${r.finalPoints}</td>`; b.appendChild(tr); }); },
        "render.turntablePrizes": () => {
            const tbody = App.DOMElements.turntablePrizeTableBody;
            if (!tbody) return;
            tbody.innerHTML = '';
            App.state.turntablePrizes.forEach(p => {
                const tr = document.createElement('tr');
                tr.dataset.id = p.id;
                tr.innerHTML = `<td>${p.text}</td><td class="actions"><button class="btn btn-primary btn-sm edit-btn">编辑</button><button class="btn btn-danger btn-sm delete-btn">删除</button></td>`;
                tbody.appendChild(tr);
            });
        },

        "render.printStudentSelect": () => {
            const select = App.DOMElements.printStudentSelect;
            if (!select) return;
            select.innerHTML = '<option value="">-- 请选择学生 --</option>';
            App.state.students
                .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'zh-Hans-CN'))
                .forEach(student => {
                    const option = document.createElement('option');
                    option.value = student.id;
                    option.textContent = student.name;
                    select.add(option);
                });
        },

        "render.groupLeaderboard": () => {
            const listElement = App.DOMElements.groupLeaderboardList;
            if (!listElement) return;

            const type = App.state.groupLeaderboardType;
            const toggle = App.DOMElements.groupLeaderboardToggle;
            toggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.type === type));

            document.getElementById('group-leaderboard-title').innerText =
                type === 'avg' ? '🏆 小组人均分排行' : '🏆 小组总分排行';

            const groupScores = App.state.groups.map(group => {
                const members = App.state.students.filter(s => s.group === group.id);
                const totalPoints = members.reduce((sum, member) => sum + member.points, 0);
                const avgPoints = members.length > 0 ? (totalPoints / members.length) : 0;
                return {
                    name: group.name,
                    score: type === 'avg' ? avgPoints : totalPoints,
                };
            });

            groupScores.sort((a, b) => b.score - a.score);

            listElement.innerHTML = '';
            if (groupScores.length === 0) {
                listElement.innerHTML = '<li>暂无小组数据</li>';
                return;
            }

            groupScores.forEach((group, index) => {
                const li = document.createElement('li');
                const scoreDisplay = type === 'avg' ? group.score.toFixed(1) : group.score;
                li.innerHTML = `<span class="rank">${index + 1}.</span><span class="name">${group.name}</span><span class="points">${scoreDisplay} 分</span>`;
                listElement.appendChild(li);
            });
        },


        "render.dashboardSortIndicators": () => {
            const { column, direction } = App.state.dashboardSortState;
            const buttons = App.DOMElements.dashboardSortControls.querySelectorAll('.sort-btn');
            buttons.forEach(btn => {
                const indicator = btn.querySelector('.sort-indicator');
                btn.classList.remove('active');
                if (indicator) indicator.textContent = '';

                if (btn.dataset.sort === column) {
                    btn.classList.add('active');
                    if (indicator) indicator.textContent = direction === 'asc' ? ' ▲' : ' ▼';
                }
            });
        },

        "render.quickReasonTable": () => {
            const tbody = App.DOMElements.quickReasonTableBody;
            tbody.innerHTML = ''; // 清空旧表格
            if (!App.state.quickReasons || App.state.quickReasons.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">暂无快捷理由</td></tr>';
                return;
            }

            App.state.quickReasons.forEach(r => {
                const tr = document.createElement('tr');
                tr.dataset.id = r.id;
                tr.innerHTML = `
            <td>${r.text}</td>
            <td>${r.points > 0 ? '+' : ''}${r.points}</td>
            <td class="actions">
                <button class="btn btn-primary btn-sm btn-edit-reason">编辑</button>
                <button class="btn btn-danger btn-sm btn-delete-reason">删除</button>
            </td>
        `;
                tbody.appendChild(tr);
            });
        },

        "render.achievementTable": () => {
            const tbody = App.DOMElements.achievementTableBody;
            tbody.innerHTML = '';

            // 核心：现在按照 level 属性排序，而不是积分
            const tiers = [...App.state.achievementTiers].sort((a, b) => a.level - b.level);
            const totalTiers = tiers.length;

            if (tiers.length === 0) {
                // 修正 colspan 以匹配新表头
                tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">暂无成就称号</td></tr>';
                return;
            }

            tiers.forEach((t, index) => {
                const tr = document.createElement('tr');
                tr.dataset.id = t.id;

                // 检查按钮是否应该被禁用
                const upDisabled = (index === 0) ? 'disabled' : '';
                const downDisabled = (index === totalTiers - 1) ? 'disabled' : '';

                // “顺序”列的按钮
                const orderButtons = `
                    <button class="btn btn-sm btn-move-up" ${upDisabled} title="上移">🔼</button>
                    <button class="btn btn-sm btn-move-down" ${downDisabled} title="下移">🔽</button>
                `;

                tr.innerHTML = `
                    <td class="actions-condensed">${orderButtons}</td> <td>${t.name}</td>
                    <td>${t.points}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm btn-edit-achievement">编辑</button>
                        <button class="btn btn-danger btn-sm btn-delete-achievement">删除</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        },
    };

    // 修正 render 子函数的挂载方式
    Object.keys(App)
        .filter(key => key.startsWith('render.'))
        .forEach(key => {
            const name = key.split('.')[1];
            if (!App.render[name]) {
                App.render[name] = App[key];
            }
            delete App[key];
        });

    App.init();
});